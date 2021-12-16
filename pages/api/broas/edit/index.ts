// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createBroaController } from "../../../../features/api/broas/controllers/createBroaController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      await createBroaController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
