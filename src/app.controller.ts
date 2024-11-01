import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}


  // ## Description easy
  /* ฟังก์ชัน login(@Request() req) ใน AppController จะถูกเรียกใช้ ซึ่งใช้ LocalAuthGuard เพื่อตรวจสอบความถูกต้องของข้อมูลล็อกอิน. */

  @UseGuards(LocalAuthGuard)
  @Post('login') // เส้นทางสำหรับล็อกอิน
  login(@Request() req): any {
    return this.authService.login(req.user); // เรียกใช้ authService เพื่อล็อกอินและส่ง token กลับ
    //เมื่อข้อมูลถูกต้อง จะส่งคืนข้อมูลผู้ใช้ (โดยละข้อมูล password ออก ซึ่งจะเหลือ name, id) ไปที่ login() ของ AuthService.
  }



  //## การเข้าถึงข้อมูลที่ถูกป้องกัน
  // เมื่อต้องการเข้าถึงข้อมูลที่ถูกป้องกัน (เช่น เส้นทาง /protected), ระบบจะตรวจสอบว่า token ที่ผู้ใช้ส่งมาใน HTTP Header นั้นถูกต้องหรือไม่
  @UseGuards(JwtAuthGuard)  //JwtAuthGuard จะถูกใช้เพื่อคอยตรวจสอบ token โดยจะเรียกใช้ฟังก์ชัน validate(payload: any) ใน JwtStrategy
  @Get('protected') // เส้นทางที่ถูกป้องกัน
  getHello(@Request() req) {
    return req.user; // ส่งข้อมูลผู้ใช้ที่ล็อกอินแล้วกลับมา
    // return this.appService.getHello(); 
  }
}
