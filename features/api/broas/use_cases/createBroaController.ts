import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../core/config/prisma";
import {
  createBroaValidation,
  ValidationError,
} from "../../../shared/lib/validation";

export const createBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const validatedData = createBroaValidation(req.body);

    try {
      const newBroa = await prisma.broa.create({
        data: validatedData,
      });

      res.status(201).json(newBroa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro a cria a broa" });
    }
  } catch (err) {
    const error = err as ValidationError;
    console.log(err);

    res.status(400).end(error.errors.toString());
    return;
  }
};
