import { useState } from "react";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

const useApi = <Func extends Function>(apiFunc: Func) => {
  const [data, setData] = useState<Awaited<ReturnType<Func>> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (
    arg?: any
  ): Promise<Awaited<ReturnType<Func>> | null> => {
    setLoading(true);
    try {
      const result = await apiFunc(arg);
      setData(result);
      return result;
    } catch (err) {
      setError((err as Error).message || "Unexpected Error!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    data && setData(null);
    error && setError("");
    loading && setLoading(false);
  };

  return {
    data,
    error,
    loading,
    request,
    reset,
  };
};

export default useApi;
