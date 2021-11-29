import type { NextApiRequest, NextApiResponse } from "next";
import { getBroasController } from "../../../features/api/broas/use_cases/getBroasController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await getBroasController(res);
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
