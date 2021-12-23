import { Broa } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../core/types";

// export a function named getBroasByUserNameController that receives a NextApiRequest and a NextApiResponse.
export const getBroasByUserIdController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Broa[]>>
) => {
  const userId = req.query.id as string;

  if (!userId || isNaN(+userId)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    const broas = await prisma.broa.findMany({ where: { userId: +userId } });

    if (!broas) {
      handleServerError(res, 400, ["broas não encontradas"]);
      return;
    }

    res.status(200).json({ data: broas, errors: null });
  } catch (error) {
    handleServerError(res, 500, ["Erro ao carregar as broas do usuário"]);
  }
};
