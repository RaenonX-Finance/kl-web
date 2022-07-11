export const isValidUsername = (account: string): boolean => {
  return account.length >= 6;
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};
