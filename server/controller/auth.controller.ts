import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AccountUser from "../models/account-user.model";
import AccountCompany from "../models/account-company.model";

export const check = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.json({
                code: "error",
                message: "Token không hợp lệ!"
            });
            return;
        }

        var decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as jwt.JwtPayload;
        const { id, email } = decoded;

        const existAccountUser = await AccountUser.findOne({
            _id: id,
            email: email,
        })

        if (existAccountUser) {
            const infoUser = {
                id: existAccountUser.id,
                fullName: existAccountUser.fullName,
                email: existAccountUser.email,
                phone: existAccountUser.phone,
                avatar: existAccountUser.avatar,

            };
            res.json({
                code: "success",
                message: "Token hợp lệ!",
                infoUser: infoUser
            });
        }
        const existAccountCompany = await AccountCompany.findOne({
            _id: id,
            email: email,
        })
        if (existAccountCompany) {
            const infoCompany = {
                id: existAccountCompany.id,
                companyName: existAccountCompany.companyName,
                email: existAccountCompany.email,
                address: existAccountCompany.address,
                companyModel: existAccountCompany.companyModel,
                companyEmployees: existAccountCompany.companyEmployees,
                workingTime: existAccountCompany.workingTime,
                workOvertime: existAccountCompany.workOvertime,
                phone: existAccountCompany.phone,
                description: existAccountCompany.description,
                logo: existAccountCompany.logo,
                city: existAccountCompany.city,

            }
            res.json({
                code: "success",
                message: "Token hợp lệ!",
                infoCompany: infoCompany
            })
        }
        if (!existAccountUser && !existAccountCompany) {
            res.clearCookie("token");
            res.json({
                code: "error",
                message: "Token không hợp lệ!"
            });
        }
    }

    catch (error) {
        res.clearCookie("token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
    }
}
export const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({
        code: "success",
        message: "Đăng xuất thành công!"
    });
}
