import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

// โมดูลสำหรับจัดการการยืนยันตัวตน
@Module({
  imports: [
    UsersModule, // นำเข้า UsersModule สำหรับการจัดการผู้ใช้
    PassportModule, // นำเข้า PassportModule สำหรับการใช้งาน Passport
    JwtModule.register({
      /* .register() เป็นวิธีการในการสร้าง instance ของ JwtModule และทำให้เราสามารถกำหนดค่าต่าง ๆ 
      (เช่น secret และ signOptions) ได้เมื่อ module ถูกนำเข้า. 
      
      หากไม่ใช้ จะต้องเขียนแบบนี้ที่ไฟลอื่น และต้อง imports เข้ามาใช้
      import { Module } from '@nestjs/common';
      import { JwtService } from '@nestjs/jwt';

      const jwtModule = new JwtModule({
        secret: 'secretTon',
        signOptions: { expiresIn: '60s' },
      });

      @Module({
        imports: [jwtModule],
      })
      export class AuthModule {}
      */

      secret: 'secretTon', // คีย์สำหรับการเข้ารหัส JWT
      /* การกำหนดคีย์ (secret) ใน JwtModule.register() จะเป็นการตั้งค่าคีย์ที่ใช้ในการเข้ารหัสและตรวจสอบ JWT 
      เมื่อมีการสร้าง token ใหม่ โดยการเข้ารหัสนี้จะช่วยให้มั่นใจได้ว่า token ที่ถูกสร้างนั้นสามารถตรวจสอบความถูกต้องได้โดยระบบ. */

      signOptions: { expiresIn: '60s' }, // กำหนดเวลาให้ token หมดอายุ
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // รายชื่อ provider ที่ใช้ในโมดูลนี้
  exports: [AuthService], // ส่งออก AuthService สำหรับใช้งานในโมดูลอื่น
})
export class AuthModule {}
