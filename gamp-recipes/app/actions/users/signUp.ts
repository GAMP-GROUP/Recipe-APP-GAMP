'use server';

import prisma from '@/prisma/client';

import bcrypt from 'bcrypt';

export const signUp = async (
	email: string,
	password: string,
	username: string,
	nationality: string
) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		return false;
	}

	const passwordHash = bcrypt.hashSync(password, 10);

	await prisma.user.create({
		data: {
			email,
			password_hash: passwordHash,
			username,
			nationality,
		},
	});

	return true;
};
