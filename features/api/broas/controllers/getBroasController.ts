import { Broa } from ".prisma/client";
import { NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../core/types";

export const getBroasController = async (
  res: NextApiResponse<ApiResponse<Broa[]>>
) => {
  try {
    const broas = await prisma.broa.findMany({
      include: { reactions: true },
      where: {
        reactions: {
          every: { reactionType: "HAHA" },
        },
      },
    });

    res.status(200).json({ data: broas, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
