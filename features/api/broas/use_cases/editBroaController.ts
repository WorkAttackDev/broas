import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../core/config/prisma";

export const editBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { wrongVersion, rightVersion, author } = req.body as Broa;

  if (typeof id !== "number") {
    res.status(400).end(`id inválido`);
    return;
  }

  if ([wrongVersion, rightVersion].some((_field) => !_field.trim().length)) {
    res.status(400).end(`Preencha todos os campos`);
    return;
  }

  try {
    const updatedBroa = await prisma.broa.update({
      where: { id: +id },
      data: {
        rightVersion,
        author,
        wrongVersion,
        updatedAt: new Date(),
      },
    });

    res.status(204).json(updatedBroa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocorreu um erro a cria a broa" });
  }
};
