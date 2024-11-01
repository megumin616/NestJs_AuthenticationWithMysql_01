import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if(user && user.password === password) {
      const { password, username, ...rest} = user;
      /*  คำสั่ง { password, username, ...rest } = user; คือการ Destructuring ที่แยกข้อมูลจาก user 
      เพื่อดึงเฉพาะบางส่วนออกมาและทิ้งข้อมูลบางส่วนที่ไม่ต้องการไป เช่น ทิ้ง password และ username แต่เก็บส่วนที่เหลือไว้ใน rest  */
      // rest ในที่นี้ก็จะเหลือข้อมูลแค่ name 
      return rest;
    }

    return null;
  }


  // สร้าง JWT เมื่อผู้ใช้ล็อกอินสำเร็จ
  async login(user: any) {
    const payload = { name: user.name, sub: user.id }; // สร้าง payload สำหรับ JWT
    return {
      access_token: this.jwtService.sign(payload), // สร้าง JWT และส่งกลับ
    };
  }
}
