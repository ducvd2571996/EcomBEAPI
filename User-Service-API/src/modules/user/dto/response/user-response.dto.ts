export class UserInfo {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserLoginResDto {
  userInfo: UserInfo;
  token: string;
}
