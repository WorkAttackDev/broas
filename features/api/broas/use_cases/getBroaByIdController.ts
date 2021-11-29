import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../core/config/prisma";

export const getBroaByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  if (typeof id !== "number") {
    res.status(400).end(`id inválido`);
    return;
  }

  try {
    const broa = await prisma.broas.findUnique({ where: { id } });
    res.status(200).json(broa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao carregar os dados" });
  }
};
