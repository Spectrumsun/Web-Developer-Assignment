import type { Post } from '../../api';
import DeleteIcon from '../../svg/Delete';

import './index.scss';

interface Props {
  post: Post;
  handleSelectDeletePost: (post: Post) => void;
}

const PostCard = ({ post, handleSelectDeletePost }: Props) => {

  return (
      <div 
        className="box bg-[#fff] rounded-[8px] p-[30px] flex flex-col h-[400px]" 
        key={post.id}>
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={() => handleSelectDeletePost(post)}>
            <DeleteIcon />
          </button>
        </div>
        <h3 
          className="text-[#535862] font-[600] text-[18px] mb-[15px]"
        >
          {post.title}
        </h3>
        <p className="text-[#535862] text-[14px]">{post.body}</p>
    </div>
  )
}

export default PostCard;
