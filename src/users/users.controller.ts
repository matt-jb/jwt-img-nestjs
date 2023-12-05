import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards";
import { UserData } from "./types";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req: Request & { user: UserData }) {
    return this.usersService.getUserInfo(req);
  }
}
