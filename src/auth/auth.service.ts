import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma-client/prisma.service';

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

    return this.sign(username);
  }

  async sign(username: string): Promise<any> {
    // TODO: Generate a JWT and return it here
    const payload = { sub: username, username };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_EXPIRATION),
    });
    return {
      access_token,
    };
  }
}
