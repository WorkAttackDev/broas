import { Broas } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../core/config/prisma";

export const createBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { wrongVersion, rightVersion, author } = req.body as Broas;

  if ([wrongVersion, rightVersion].some((_field) => !_field.trim().length)) {
    res.status(400).end(`Preencha todos os campos`);
    return;
  }

  try {
    const newBroa = await prisma.broas.create({
      data: { rightVersion, wrongVersion, author },
    });

    res.status(201).json(newBroa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocorreu um erro a cria a broa" });
  }
};
