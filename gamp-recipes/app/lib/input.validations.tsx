export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  const characters = 6;
  return password.length > characters;
};

export const validateUsername = (username: string) => {
  const characters = 3;
  return username.length > characters;
};

export const validateLogin = (
  email: string,
  password: string,
  username: string
): boolean => {
  const teste =
    validateEmail(email) &&
    validatePassword(password) &&
    validateUsername(username);
  console.log(teste);

  return teste;
};
