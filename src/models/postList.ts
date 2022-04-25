export interface postDetail {
  data?: aboutPost[] | null;
  total: number;
  page: number;
  limit: number;
}
export interface aboutPost {
  id: number;
  image: string;
  likes: number;
  isLiked:boolean;
  tags?: string[] | null;
  text: string;
  publishDate: string;
  owner: Owner;
}
export interface Owner {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}
