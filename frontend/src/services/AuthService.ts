import { chatDialogControllerFindMany } from "../generated/client";
import { client } from "../generated/client/client.gen";

export class AuthService {
  async login({ apiKey }: { apiKey: string }) {
    try {
      const result = await chatDialogControllerFindMany({
        headers: { "x-api-key": apiKey },
        query: { curPage: 1, perPage: 1 },
      });

      if (result?.error) {
        throw Object.assign(new Error(), result.error);
      }

      localStorage.setItem("apiKey", apiKey);
      client.setConfig({ headers: { "x-api-key": apiKey } });
    } catch (error) {
      localStorage.removeItem("apiKey");
      client.setConfig({ headers: { "x-api-key": null } });
      console.error(error);
      throw new Error("Invalid credentials, please try again");
    }
  }

  async logout() {
    localStorage.removeItem("apiKey");
    client.setConfig({ headers: { "x-api-key": null } });
  }

  async checkAccess() {
    return localStorage.getItem("apiKey") !== null;
  }

  getApiKey() {
    return localStorage.getItem("apiKey");
  }
}

export const authService = new AuthService();
