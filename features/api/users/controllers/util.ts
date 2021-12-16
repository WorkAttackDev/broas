import { User } from ".prisma/client";

export const sanitizedUser = (user: User) => {
  const { password, ...validUser } = user;
  return validUser;
};
