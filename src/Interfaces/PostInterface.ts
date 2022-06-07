export interface PostInterface{ //structure for making and sending post objects without having to include post ID
    content: string,
    author: string,
    date: string,
}

export interface DatabasePostInterface { //structure for getting from database
    content: string,
    authorID: string,
    date: string,
    _id: string
  }