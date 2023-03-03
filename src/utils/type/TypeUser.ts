export interface user {
    avatar: string;
    email: string;
    name: string;
    phoneNumber: string;
    userId: number;
  }


export interface userRegister{
    email: string,
    passWord: string,
    name: string,
    phoneNumber: string
}
  
  
  export interface userLogin {
    email: string
    passWord: string
  }