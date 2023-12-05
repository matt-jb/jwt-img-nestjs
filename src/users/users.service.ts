import { Injectable } from "@nestjs/common";
import { UserData } from "./types";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: "user",
      password: "password",
    },
  ];

  async getUser(
    username: string,
    password: string
  ): Promise<UserData | undefined> {
    const user = this.users.find((user) => user.username === username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }

  async getUserInfo(req: Request & { user: UserData }) {
    const token = jwtDecode(req.headers["authorization"]);
    const loggedInAt = dayjs.unix(token.iat).format("YYYY-MM-DD HH:mm:ss");

    return {
      id: req.user.userId,
      name: req.user.username,
      loggedInAt,
    };
  }
}
