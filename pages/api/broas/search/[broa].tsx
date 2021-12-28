import type { NextApiRequest, NextApiResponse } from "next";
import { getBroaByBroaController } from "../../../../features/api/broas/controllers/getBroaByBroaController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await getBroaByBroaController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
