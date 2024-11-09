export class UserInfo {
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  email: string;
  role?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserLoginResDto {
  userInfo: UserInfo;
  token: string;
}
