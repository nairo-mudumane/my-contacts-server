import type { INewUser, INewUserFormatted } from "../@types";

export function formatUser({
  avatar,
  email,
  firstname,
  lastname,
}: INewUser): INewUserFormatted {
  const formatted: INewUserFormatted = {
    avatar,
    email,
    firstname,
    lastname,
    contacts: [],
    favorites: [],
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
