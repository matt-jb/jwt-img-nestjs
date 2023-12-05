import { Prettify } from "src/types";

export type User = {
  userId: number;
  username: string;
  password: string;
};

export type UserData = Prettify<Omit<User, "password">>;
