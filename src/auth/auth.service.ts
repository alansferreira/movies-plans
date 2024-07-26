import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { JWtDataDto } from './dto/jwt-data.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { id: user_id } = user;
    return this.sign({ user_id, username });
  }

  async sign({ username, user_id }: JWtDataDto): Promise<any> {
    // TODO: Generate a JWT and return it here
    const payload = { sub: username, username, user_id };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
