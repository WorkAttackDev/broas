import { AxiosResponse } from "axios";
import { ApiResponse } from "../../api/core/types";
import {
  ForgetPasswordParams,
  LoginValidationParams,
  LoginWithGoogleValidationParams,
  ResetPasswordParams,
} from "../../shared/lib/validation";
import { MyUser } from "../../shared/models/my_user";
import { AxiosInstance } from "../core/config/client";

// * Endpoints
export const AuthRefreshTokenEndpoint = "/auth/refresh-token";
export const AuthLoginEndpoint = "/auth/login";
export const AuthLoginWithGoogleEndpoint = "/auth/login_with_google";
export const AuthForgetPasswordEndpoint = "/auth/forget_password";
export const AuthResetPasswordEndpoint = "/auth/reset_password";
export const AuthLogoutEndpoint = "/auth/logout";
export const AuthMeEndpoint = "/auth/me";

// * API call functions

export const loginClient = async (data: LoginValidationParams) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<{ token: string; user: MyUser }>>
  >(AuthLoginEndpoint, data);
  return res.data.data;
};

export const loginWithGoogleClient = async (
  data: LoginWithGoogleValidationParams
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<{ token: string; user: MyUser }>>
  >(AuthLoginWithGoogleEndpoint, data);
  return res.data.data;
};

export const forgetPasswordClient = async (data: ForgetPasswordParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<string>>>(
    AuthForgetPasswordEndpoint,
    data
  );
  return res.data.data;
};

export const resetPasswordClient = async (data: ResetPasswordParams) => {
  const res = await AxiosInstance.patch<
    any,
    AxiosResponse<ApiResponse<string>>
  >(AuthResetPasswordEndpoint, data);
  return res.data.data;
};

export const logoutClient = async () => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<boolean>>>(
    AuthLogoutEndpoint
  );
  return res.data.data;
};

export const meClient = async () => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<MyUser>>>(
    AuthMeEndpoint
  );

  return res.data.data;
};
