import { Broas } from ".prisma/client";
import axios, { AxiosResponse } from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getBroasClient = async () => {
  try {
    const res = await AxiosInstance.get<any, AxiosResponse<Broas[]>>("/broas");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
