import { Broa } from ".prisma/client";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../../api/core/types";
import { EditBroaValidationParams } from "../../shared/lib/validation";
import { AxiosInstance } from "../core/config/client";

export const getBroasClient = async () => {
  try {
    const res = await AxiosInstance.get<
      any,
      AxiosResponse<ApiResponse<Broa[]>>
    >("/broas");
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBroaByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/" + id
  );
  return res.data.data;
};

export const createBroaClient = async (data: EditBroaValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/edit",
    data
  );

  console.log(res.data);

  return res.data.data;
};

export const updateBroaClient = async (
  id: number,
  data: EditBroaValidationParams
) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/edit/" + id,
    data
  );

  return res.data.data;
};

export const deleteBroaClient = async (id: number) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/broas/" + id);

  return res.data.data;
};
