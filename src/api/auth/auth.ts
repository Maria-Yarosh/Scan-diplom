import { api } from "../config";

interface IAuthCredentialsResponse {
  accessToken: string;
  expire: string;
}

export class AuthApi {
  static async getAuthCredentials(credentials: { login: string; password: string }): Promise<IAuthCredentialsResponse> {
    const response = await api.post("/api/v1/account/login", credentials);
    return response.data;
  }
}
