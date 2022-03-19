export interface postDetail {
  data?: aboutPost[] | null;
  total: number;
  page: number;
  limit: number;
}
export interface aboutPost {
  id: Number;
  image: string;
  likes: number;
  tags?: string[] | null;
  text: string;
  publishDate: string;
  owner: Owner;
}
export interface Owner {
  id: Number;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}
