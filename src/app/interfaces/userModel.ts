export interface UserModel {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  unit?: string;
  group?: string;
  division?: string;
  status?: string;
  dateCreated?: Date;
  createdBy?: string;
}
