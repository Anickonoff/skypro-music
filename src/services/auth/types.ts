export type authUserProps = {
  email: string;
  password: string;
};

export type authUserResponse = {
  email: string;
  username: string;
  _id: number;
};

export type signUpUserProps = {
  email: string;
  password: string;
  username: string;
};

export type signUpUserResponse = {
  message: string;
  result: {
    email: string;
    username: string;
    _id: number;
  };
  success: boolean;
};

export type getTokenResponse = {
  refresh: string;
  access: string;
};

export type refreshTokenResponse = {
  access: string;
};
