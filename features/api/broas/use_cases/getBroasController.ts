import { NextApiResponse } from "next";
import prisma from "../../../core/config/prisma";

export const getBroasController = async (res: NextApiResponse) => {
  try {
    const broas = await prisma.broa.findMany();
    res.status(200).json(broas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao carregar os dados" });
  }
};
