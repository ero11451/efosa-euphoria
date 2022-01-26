import { UserModel } from './../interfaces/userModel';

export class Constants {
  public static BASE_URL = 'https://172.20.5.27:8001/';
}

export class Store {
  public static AUTH_TOKEN = "";
  public static REFRESH_TOKEN = "";
  public static USER?: UserModel;
}
