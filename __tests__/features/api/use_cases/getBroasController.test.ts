import { createMocks } from "node-mocks-http";
import { getBroasController } from "../../../../features/api/broas/use_cases/getBroasController";
describe("/api/broas", () => {
  test("returns status 200 and a list of broas", async () => {
    const { res } = createMocks({
      method: "GET",
    });

    //   await handleAnimal(req, res);
    await getBroasController(res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toBeInstanceOf(Array);
  });
});
