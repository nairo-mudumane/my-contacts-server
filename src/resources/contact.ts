import type { INewContact, INewContactFormatted } from "../@types";

export function formatContact({
  email,
  firstname,
  lastname,
  phone,
}: INewContact): INewContactFormatted {
  const formatted: INewContactFormatted = {
    email,
    phone,
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
