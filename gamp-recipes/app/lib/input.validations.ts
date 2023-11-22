import prisma from '@/prisma/client';

export const validateEmail = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	if (re.test(email)) return true;

	return false;
};

export const validatePassword = (password: string) => {
	const characters = 6;

	if (password.length > characters) return true;

	return false;
};

export const validateNationality = (nationality: string) => {
	const characters = 2;
	if (nationality.length === characters) return true;

	return false;
};

export const validateUsername = (username: string) => {
	const characters = 3;
	if (username.length > characters && username.length < 10) return true;

	return false;
}; 

export const validateLogin = (
	email: string,
	password: string,
	username: string,
	nationality: string
): boolean => {
	const teste =
		validateEmail(email) &&
		validatePassword(password) &&
		validateUsername(username) &&
		validateNationality(nationality);

	return teste;
};


export const isEmailRegistred = async (email: string) => {
	const isEmailRegistred = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!isEmailRegistred) {
		return false;
	}

	return true;
};

