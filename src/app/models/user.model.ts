export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface RandomUserApiResponseBase {
  support: {
    url: string;
    text: string;
  };
}
export interface RandomMultipleUserApiResponse
  extends RandomUserApiResponseBase {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: User[];
}

export interface RandomSingleUserApiResponse extends RandomUserApiResponseBase {
  data: User;
}
