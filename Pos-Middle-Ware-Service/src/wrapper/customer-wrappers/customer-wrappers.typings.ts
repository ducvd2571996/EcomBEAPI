// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace CustomerWrappersAPIType {
  type GetCustomerPayload = {
    id: number;
  };

  type GetCustomerResponse = {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
