export const validateEmail = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

export const validatePassword = (password: string) => {
	const characters = 6;

	return password.length > characters;
};

export const validateNationality = (password: string) => {
	const characters = 2;
	return password.length === characters;
};

export const validateUsername = (username: string) => {
	const characters = 3;
	return username.length > characters && username.length < 10;
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
	console.log(teste);

	return teste;
};
