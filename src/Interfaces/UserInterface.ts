export interface UserInterface{ //structure for making and sending user objects without having to include user ID
    username: string,
    password: string, 
    name: string,
    isAdmin: false
    likes:[]
}

export interface DatabaseUserInterface { //structure for getting from database
    username: string;
    password: string;
    name: string,
    isAdmin: boolean;
    likes:[]
    _id: string;
  }