import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; // นำเข้า Strategy สำหรับการล็อกอินด้วย Local
import { AuthService } from "../auth.service";

// Strategy สำหรับการตรวจสอบข้อมูลผู้ใช้ด้วย Local Strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // เรียกใช้ constructor ของ PassportStrategy
    }

    //## Description easy
    /* เมื่อมีการเรียกใช้ฟังก์ชัน validate(username: string, password: string) ใน LocalStrategy,
     ระบบจะตรวจสอบ username และ password ที่ส่งเข้ามา. */
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password); // ตรวจสอบผู้ใช้จาก AuthService

        if (!user) throw new UnauthorizedException(); // ถ้าไม่มีผู้ใช้ให้โยน UnauthorizedException

        return user; // ส่งคืนข้อมูลผู้ใช้
    }
}
