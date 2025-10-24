import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AccountUser from '../models/account-user.model';
import jwt from 'jsonwebtoken';
import { AccountRequest } from '../interfaces/request.interface';

export const registerPost = async (req: Request, res: Response) => {
    const existAccount = await AccountUser.findOne({ email: req.body.email })
    if (existAccount) {
        res.json({
            code: "error",
            message: "Email đã tồn tại"
        })
        return;
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const account = new AccountUser(req.body);
    await account.save();
    res.json({
        code: "success",
        message: "Đăng ký thành công"
    })
}
export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existAccount = await AccountUser.findOne({
        email: email
    });

    if (!existAccount) {
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        })
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, existAccount.password ?? "");

    if (!isPasswordValid) {
        res.json({
            code: "error",
            message: "Mật khẩu không đúng!"
        })
        return;
    }

    const token = jwt.sign(
        {
            id: existAccount.id,
            email: existAccount.email
        },
        `${process.env.JWT_SECRET}`,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,  // 1 ngày
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" // Chỉ gửi cookie qua HTTPS trong môi trường production
    });

    res.json({
        code: "success",
        message: "Đăng nhập thành công!"
    })

}
export const profilePatch = async (req: AccountRequest, res: Response) => {
    if (!req.file) {
        req.body.avatar = req.account?.avatar;
    } else {
        delete req.body.avatar;
    }
    await AccountUser.updateOne({
        _id: req.account?._id
    },req.body);
    res.json({
        code: "success",
        message: "Cập nhật thành công!"
    })
}