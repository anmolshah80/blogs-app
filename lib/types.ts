export type TPost = {
  userId: number;
  description: string;
  id: string;
  title: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUser = {
  id: string;
  email: string;
  password: string;
};
