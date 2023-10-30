export type LoginParamsType = {
  identifier: string;
  password: string;
  shouldRemember?: boolean;
};

export type RegisterParamsType = {
  email: string;
  password: string;
  fullName: string;
};
