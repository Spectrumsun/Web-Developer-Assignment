import axios from 'axios';

export enum AdderKey {
  Street = "street",
  State = "state",
  City = "city",
  Zipcode = "zipcode",
}

export interface Adder {
  key: AdderKey;
  value: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  adders?: Adder[];
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL;
console.log(baseUrl, 'baseUrl')

export const fetchUsers = async (pageNumber: number, pageSize: number): Promise<User[]> => {
  const { data } = await axios.get(`${baseUrl}/users`, {
    params: { pageNumber, pageSize }
  });
  return data;
};

export const fetchUserById = async (userId: string): Promise<User & { totalPosts: number }> => {
  const { data } = await axios.get(`${baseUrl}/users/${userId}`);
  return data;
};


export const fetchPostByUserId = async (
  userId: string,
): Promise<Post[]> => {
  const res = await fetch(`${baseUrl}/posts?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json(); 
};

export const createPost = async (newPost: { user_id: string; title: string; body: string }) => {
  const res = await axios.post(`${baseUrl}/posts`, newPost);
  return res.data;
};


export const deletePost = async (id: string) => {
  const { data } = await axios.delete(`${baseUrl}/posts/${id}`);
  return data;
};


export const fetchUsersCount = async (): Promise<number> => {
  const { data } = await axios.get(`${baseUrl}/users/count`);
  return data.count;
};