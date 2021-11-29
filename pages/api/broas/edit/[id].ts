// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { editBroaController } from "../../../../features/api/broas/use_cases/editBroaController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PUT": {
      await editBroaController(req, res);

      break;
    }
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
