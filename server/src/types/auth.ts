declare module 'express-session' {
  export interface SessionData {
    userId?: string;
    followers?: string;
    vcode?: string;
    username?: string;
    email?: string;
  }
}

export interface RegisterForm {
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  sex: string;
  email: string;
  createPassword: string;
  confirmPassword: string;
  authType: string;
};

export type Email = {
  email: string;
};

export type Username = {
  username: string;
};
