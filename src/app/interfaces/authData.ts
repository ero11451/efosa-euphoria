import { UserModel } from "./userModel";

export interface AuthData {
  token: string;
  refreshToken: string;
  user: UserModel;
}
