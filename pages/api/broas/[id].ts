import type { NextApiRequest, NextApiResponse } from "next";
import { getBroaByIdController } from "../../../features/api/broas/use_cases/getBroaByIdController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await getBroaByIdController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
