import { Broa } from ".prisma/client";
import axios, { AxiosResponse } from "axios";
import { CreateBroaValidationParams } from "../../shared/lib/validation";

const isProd = process.env.NODE_ENV === "production";

const AxiosInstance = axios.create({
  baseURL: isProd
    ? "https://broas.vercel.app/api"
    : "http://localhost:3000/api",
});

export const getBroasClient = async () => {
  try {
    const res = await AxiosInstance.get<any, AxiosResponse<Broa[]>>("/broas");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBroaByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<any, AxiosResponse<Broa>>("/broas/" + id);
  return res.data;
};

export const createBroaClient = async (data: CreateBroaValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<Broa>>(
    "/broas/edit",
    data
  );
  return res.data;
};
