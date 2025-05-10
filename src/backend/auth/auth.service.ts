
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // In a real app, we would validate user credentials against a database
  async validateUser(email: string, password: string): Promise<any> {
    // Mock user for development
    const user = {
      id: '1',
      email: 'user@example.com',
      password: 'password123',
    };

    if (email === user.email && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email },
    };
  }
}
