import { Request, Response } from "express";
import Tipo from "../repository/tipo.repository";
import { asyncHandle } from "../middleware/errorhandler.middleware";

export const findAll = asyncHandle(async (req: Request, res: Response) => {
    const data = await Tipo.getAll();
    if(data.length === 0) res.status(404).json({ 
        status: false, 
        data: "Nenhum tipo encontrado." 
    });
    else res.status(200).json({ status: true, data })
});

export const create = asyncHandle(async (req: Request, res: Response) => {
    const newTipo = await Tipo.create(req.body);
    res.status(201).json({ status: true, data: newTipo });
});

