
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  // Mock database for development
  private users = [
    {
      id: '1',
      email: 'user@example.com',
      password: 'password123',
      fullName: 'Example User',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === email);
    
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const userExists = this.users.some(user => user.email === registerDto.email);
    
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }
    
    // In a real application, you would hash the password and store in a database
    const newUser = {
      id: (this.users.length + 1).toString(),
      email: registerDto.email,
      password: registerDto.password, // In production, this should be hashed
      fullName: registerDto.fullName,
    };
    
    this.users.push(newUser);
    
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName },
    };
  }
}
