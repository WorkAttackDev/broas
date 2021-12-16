import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../core/types";

export const updateBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Broa>>
) => {
  const { id } = req.query;
  const { wrongVersion, rightVersion, author } = req.body as Broa;

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  if ([wrongVersion, rightVersion].some((_field) => !_field.trim().length)) {
    handleServerError(res, 400, ["preencha todos os campos"]);
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

    res.status(200).json({ data: updatedBroa, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Ocorreu um erro ao editar broa"]);
  }
};
