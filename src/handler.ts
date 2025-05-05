import { Request, Response } from "express";

export const ping = (_: Request, res: Response) => {
    res.json({ message: "Pong @ univap.br - " + process.env.npm_package_version })
}