export interface User {
    Id: string;
    Email: string;
    Name: string;
    Password: string;
    isAdmin: number;
    isDeleted: number;
    isEmailSent: number;
  }
  
  export interface Payload {
    Sub: string;
    Name: string;
    isAdmin: number;
  }
  