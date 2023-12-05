import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.getUser(username, password);
    if (!user) throw new BadRequestException("Invalid username or password");

    return this.generateJWT(user.username, user.userId);
  }

  private generateJWT(name: string, id: number) {
    const payload = { username: name, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
