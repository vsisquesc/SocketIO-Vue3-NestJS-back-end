import { ConflictException, Injectable } from '@nestjs/common';

type User = {
  email: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async login(email: string): Promise<boolean> {
    const idx = this.users.map((e) => e.email).indexOf(email);
    if (idx == -1) {
      const u: User = {
        email: email,
      };
      this.users.push(u);

      return true;
    }
    return false;
  }

  async logout(email: string): Promise<boolean> {
    const idx = this.users.map((e) => e.email).indexOf(email);
    if (idx >= 0) {
      this.users.splice(idx, 1);
      return true;
    }
    return false;
  }
}
