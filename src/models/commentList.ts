import { Owner } from "./postList";

export interface CommentsData {
    data?: (commentOwner)[] | null;
    total: number;
    page: number;
    limit: number;
  }
  export interface commentOwner {
    id: string;
    message: string;
    owner: Owner;
    post: Number;
    publishDate: string;
  }
  
  