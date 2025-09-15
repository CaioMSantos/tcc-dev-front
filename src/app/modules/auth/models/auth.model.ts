import { UserDTO } from "..";

export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  clientUser: UserDTO;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.clientUser = auth.clientUser;
  }
}
