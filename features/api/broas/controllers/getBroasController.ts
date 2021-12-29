import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { PaginatedApiResponse } from "../../../shared/types";

export const getBroasController = async (
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<Broa[]>>
) => {
  const { page, limit } = req.query as { page?: string; limit?: string };

  const currentPage = Number(page) || 0;
  const perPage = Number(limit) || 20;

  try {
    const total = await prisma.broa.count();

    const broas = await prisma.broa.findMany({
      skip: currentPage * perPage,
      take: perPage,
      include: { reactions: true, _count: true },
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({
      data: broas,
      errors: null,
      pagination: { page: currentPage, limit: perPage, total },
    });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
