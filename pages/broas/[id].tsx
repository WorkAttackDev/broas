import { Broa } from ".prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Card from "../../features/core/components/Card";
import Loading from "../../features/core/components/Loading";
import { getBroaByIdClient } from "../../features/core/config/client";
import useApi from "../../features/core/hooks/use_api";

const BroaPage: NextPage = () => {
  const [broa, setBroa] = useState<Broa | null>(null);
  const { query } = useRouter();

  const getBroaByIdMutation = useApi(getBroaByIdClient);

  useEffect(() => {
    const id = query.id as string | undefined;
    if (!id) return;

    (async () => {
      const data = await getBroaByIdMutation.request(id);
      if (!data) return;
      setBroa(data);
    })();
  }, [query]);

  return (
    <main className='  p-16'>
      {broa && <Card broa={broa} className='mx-auto max-w-[40rem]' />}
      <Loading isLoading={getBroaByIdMutation.loading} />
    </main>
  );
};

export default BroaPage;
