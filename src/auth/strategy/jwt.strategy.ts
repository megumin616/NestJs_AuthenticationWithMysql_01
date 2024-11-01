import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; // นำเข้า ExtractJwt และ Strategy สำหรับ JWT

// Strategy สำหรับการตรวจสอบข้อมูลผู้ใช้ด้วย JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            /*การใช้ super({}) ใน constructor ของคลาส JwtStrategy หมายถึงการเรียก constructor
             ของคลาสแม่ที่ชื่อว่า PassportStrategy. */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ดึง JWT จาก Bearer token
            ignoreExpiration: false, // ไม่ให้ละเลยการหมดอายุของ token
            secretOrKey: 'secretTon' // คีย์สำหรับการเข้ารหัส
            /* คีย์เดียวกัน (secretOrKey) จะถูกใช้ในการตรวจสอบความถูกต้องของ JWT ที่ถูกส่งมาใน request 
            โดย PassportStrategy จะใช้คีย์นี้ในการถอดรหัส token และตรวจสอบว่า token นั้นถูกสร้างขึ้นโดยผู้ที่มีสิทธิ์ (ผู้ที่รู้คีย์นี้).
            ถ้า token ถูกแก้ไขหรือไม่ตรงกับคีย์นี้, ระบบจะไม่ยอมให้ผู้ใช้ผ่านการตรวจสอบและไม่อนุญาตให้เข้าถึงข้อมูลที่ต้องการ.*/
        })
    }

    // ตรวจสอบข้อมูลใน payload ของ JWT
    async validate(payload: any) {
        return {
            id: payload.sub, // คืนค่ารหัสผู้ใช้
            name: payload.name, // คืนค่า ชื่อผู้ใช้
            // pa: payload
        }
    }
}
