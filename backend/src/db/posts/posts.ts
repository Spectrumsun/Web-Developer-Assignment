import { v4 as uuidv4 } from 'uuid';
import { connection } from "../connection";
import { 
  selectPostsTemplate,  
  insertPostTemplate,
  deletePostTemplate, 
} from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });


export const createPost = (post: { user_id: string, title: string, body: string }): Promise<Post> => {
  const id = uuidv4();
  const created_at = new Date().toISOString();

  return new Promise((resolve, reject) => {
    connection.run(
      insertPostTemplate,
      [id, post.user_id, post.title, post.body, created_at],
      (err) => {
        if (err) return reject(err);
        resolve({ ...post, id, created_at });
      }
    );
  });
};

export const deletePost = (postId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
