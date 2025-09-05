import { useState } from 'react';
import { fetchUserById, fetchPostByUserId, createPost, deletePost } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingDots from '../../components/Loader';
import type { Post } from '../../api';
import ArrowBack from '../../svg/ArrowBack';
import Plus from '../../svg/Plus';
import PostCard from '../../components/PostCard';
import Modal from '../../components/Modal';
import AddPost from '../../components/AddPost';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeletePost from '../../components/DeletePost';

import './index.scss';

const Posts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [toggleAddPost, setToggleAddPost] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    title: false,
    body: false,
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId], 
    queryFn: () => fetchUserById(userId ?? ""),
  });

  const { data: posts = [], isLoading: postLoading } = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostByUserId(userId ?? ""),
  });

  const createPostQuery = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setToggleAddPost(false);
       setLoading(false);
       setTitle("");
       setBody("");
       setError({ title: false, body: false });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostQuery = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      setToggleDelete(false);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSelectDeletePost = (post: Post) => {
    setSelectedPost(post);
    setToggleDelete(true);
    console.log(post);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(name === 'title') {
      setTitle(value);
      setError({ ...error, title: false });
    }

    if(name === 'body') {
      setBody(value);
      setError({ ...error, body: false });
    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = {
      title: title.trim().length === 0,
      body: body.trim().length === 0, 
    }
    setError(check);

    if(Object.values(check).includes(true)) return;

    if(user) {
      setLoading(true);
      createPostQuery.mutate({ 
        title: title,
        body: body,
        user_id: user?.id,
      }); 
    }
  }

  const handleDeletePost = async () => {
    if(selectedPost) {
       setLoading(true);
      deletePostQuery.mutate(selectedPost.id);
    }
  }

  if(isLoading || postLoading || loading)  {
    return <LoadingDots />;
  }

  return (
    <div className="users flex justify-center items-center">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]  p-[20px]">
        <div className="mb-[30px]">
          <button className="flex items-center gap-2 cursor-pointer mt-4" onClick={() => navigate('/')}>
            <ArrowBack />
            <p className="text-[#535862] font-[600] text-[14px]">Back to Users</p>
          </button>
        </div>
       <div>
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-[500] text-[#181D27]">
          {user?.name}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mt-[20px] mb-[20px] sm:mt-[25px] sm:mb-[25px] md:mt-[30px] md:mb-[30px]">
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#535862] font-[400]">
            {user?.email}
          </p>
          <div className="w-[5px] h-[5px] bg-[#000] rounded-full" />
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#535862] font-[400]">
            {user?.totalPosts} Posts
          </p>
        </div>
      </div>

        <div className="posts grid gap-[20px] mt-[24px]">
          <div className="posts__new flex items-center justify-center rounded-[8px]">
            <button 
              className="flex flex-col items-center cursor-pointer p-[50px]" 
              onClick={() => setToggleAddPost(true)}
            >
              <Plus />
              <p className="text-[#717680] text-[14px] font-[400]">New Post</p>
            </button>
  
          </div>
            {
              posts?.length > 0 ? (
                posts.map((post: Post) => (
                  <PostCard
                    key={post.id} 
                    post={post}
                    handleSelectDeletePost={handleSelectDeletePost}
                  />
                ))
              ) : (
                <div>No Posts</div>
              )
            }
          </div>
      </div>
      <Modal toggle={toggleAddPost}>
        <AddPost 
          setToggleAddPost={setToggleAddPost} 
          title={title} 
          body={body} 
          error={error} 
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
        />
      </Modal>
      <Modal toggle={toggleDelete}>
        <DeletePost 
          setToggleDelete={setToggleDelete} 
          selectedPost={selectedPost} 
          handleDeletePost={handleDeletePost}
        />
      </Modal>
    </div>
  )
};

export default Posts;