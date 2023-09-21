/* eslint-disable no-mixed-spaces-and-tabs */
import prisma from '@/prisma/client';
import { Account, AuthOptions, Profile, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';


export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			id: 'credentials',
			name: 'credentials',

			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'your@email.com',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			authorize: async (credentials) => {
				if (!credentials) {
					return null;
				}

				const { email, password } = credentials;

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (!user) {
					return null;
				}

				const userPassword = user.password_hash;

				const isValidPassword = bcrypt.compareSync(password, userPassword);

				if (!isValidPassword) {
					return null;
				}

				return user as unknown as User;
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		async encode({ secret, token }) {
			if (!token) {
				throw new Error('No token to encode');
			}
			return jwt.sign(token, secret);
		},
		async decode({ secret, token }) {
			if (!token) {
				throw new Error('No token to decode');
			}
			const decodedToken = jwt.verify(token, secret);
			if (typeof decodedToken === 'string') {
				return JSON.parse(decodedToken);
			} else {
				return decodedToken;
			}
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	callbacks: {
		async session(params: { session: Session; token: JWT; user: User }) {
			if (params.session.user) {
				params.session.user.email = params.token.email;
			
				
			}

			return params.session;
		},
		async jwt(params: {
			token: JWT;
			user?: User | undefined;
			account?: Account | null | undefined;
			profile?: Profile | undefined;
			isNewUser?: boolean | undefined;
		}) {
			if (params.user) {
				params.token.email = params.user.email;
				params.token.id = params.user.id;
			}

			return params.token;
		},
		async signIn({ profile, credentials }) {
			if (!profile?.email && !credentials?.email) {
				throw new Error('No profile');
			}
			console.log(profile);

			const isUserRegistered = await prisma.user.findUnique({
				where: {
					email: profile?.email 
				},
			});

			if (!isUserRegistered) {
				if (profile?.email) {
					await prisma.user.upsert({
						where: {
							email: profile.email,
						},
						create: {
							email: profile.email,
							username: profile.name,
							nationality: profile.locale.split('-')[1],
							password_hash: await bcrypt.hash(profile.email, 10),
						},
						update: {
							username: profile.name,
						},
					});

				}
				
			}
			
			return true;
		}

	},
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
