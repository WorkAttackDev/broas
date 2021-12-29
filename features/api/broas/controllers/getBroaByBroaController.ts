import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { ApiResponse } from "../../../shared/types";

export const getBroaByBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyBroaReactions[]>>
) => {
  const broa = req.query.broa as string;

  if (!broa) {
    handleServerError(res, 400, ["broa inválida"]);
    return;
  }

  try {
    const broas = await prisma.broa.findMany({
      where: {
        wrongVersion: {
          contains: broa,
        },
      },
      include: { reactions: true },
    });

    if (!broas) {
      handleServerError(res, 400, ["nenhum resultado encontrado"]);
      return;
    }

    res.status(200).json({ data: broas, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao procurar as broas"]);
  }
};
