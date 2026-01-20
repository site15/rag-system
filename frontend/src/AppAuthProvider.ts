// in src/authProvider.ts
import { AuthProvider } from "react-admin";
import { authService } from "./services/AuthService";

export const appAuthProvider: AuthProvider = {
  // called when the user attempts to log in
  async login({ apiKey }) {
    console.log("login", { apiKey });
    return authService.login({ apiKey });
  },
  // called when the user clicks on the logout button
  async logout() {
    console.log("logout");
    return authService.logout();
  },
  // called when the API returns an error
  async checkError(args) {
    console.log("checkError", args);
    // null
  },
  // called when the user navigates to a new location, to check for authentication
  async checkAuth() {
    if (!(await authService.checkAccess())) {
      throw new Error("Unauthorized");
    }
  },
  async canAccess(args) {
    console.log("canAccess", args);
    return true;
  },
};
