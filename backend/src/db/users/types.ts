export enum AdderKey {
  Street = "street",
  State = "state",
  City = "city",
  Zipcode = "zipcode",
}

export interface Adder {
  key: AdderKey;
  value: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  adders?: Adder[];
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};
