import { Broa } from ".prisma/client";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import Card from "../features/client/core/components/Card";
import MainLayout from "../features/client/core/components/MainLayout";
import Loading from "../features/client/core/components/Loading";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { sortByDate } from "../features/client/core/utils";
import ListBroas from "../features/client/broa/components/ListBroas";

export const Home: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { broas, setBroas } = useBroasStore();

  const getBroasApi = useApi<typeof getBroasClient>();

  sortByDate<Broa>(broas);

  useEffect(() => {
    (async () => {
      const data = await getBroasApi.request(getBroasClient());
      if (!data) return;
      setBroas(data);
    })();
  }, []);

  return (
    <MainLayout>
      <ListBroas user={user} broas={broas} />
      <Loading isLoading={getBroasApi.loading} />
    </MainLayout>
  );
};

export default Home;
