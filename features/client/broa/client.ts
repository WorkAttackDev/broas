import { Broa, BroaReaction } from ".prisma/client";
import { AxiosResponse } from "axios";
import { EditBroaValidationParams } from "../../shared/lib/validation/edit_broa_validator";
import { ToggleReactionValidatorParams } from "../../shared/lib/validation/toggleReactionValidate";
import { MyBroaReactions } from "../../shared/models/my_broa_reactions";
import { ApiResponse, PaginatedApiResponse } from "../../shared/types";
import { AxiosInstance } from "../core/config/client";
import { globalSetBroaPaginated } from "./stores/useBroasStore";

export const getBroasClient = async (page?: number, limit?: number) => {
  try {
    const res = await AxiosInstance.get<
      any,
      AxiosResponse<PaginatedApiResponse<Broa[]>>
    >(`/broas?page=${page ?? 0}&limit=${limit ?? 20}`);

    globalSetBroaPaginated(res.data.data, res.data.pagination);

    console.log("getBroasClient", res.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBroasByUserIdClient = async (userId: number) => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<Broa[]>>>(
    "/broas/" + userId + "/broas"
  );
  return res.data.data;
};

export const getBroasByBroaClient = async (wrongVersion: string) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyBroaReactions[]>>
  >("/broas/search/" + wrongVersion);
  return res.data.data;
};

export const getBroaByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/" + id + "/broa"
  );
  return res.data.data;
};

export const createBroaClient = async (data: EditBroaValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/edit",
    data
  );

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

export const deleteBroaClient = async (id: number, userId: number) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/broas/" + id, {
    data: { userId },
  });

  return res.data.data;
};

//* Reactions
export const toggleReactionClient = async (
  data: ToggleReactionValidatorParams
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<(BroaReaction & { broa?: Broa }) | null>>
  >("/broas/reaction", data);

  return res.data.data;
};
