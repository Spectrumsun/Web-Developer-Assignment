import type { Post } from '../../api';

interface Props {
  setToggleDelete: (toggle: boolean) => void;
  selectedPost: Post | null;
  handleDeletePost: () => void;
}

const DeletePost = ({ 
  setToggleDelete,
  selectedPost,
  handleDeletePost,
}: Props) => {
  return (
     <div className="p-[20px]">
      <h1 
      className="text-center text-[25px] font-[500] text-[#181D27] mb-[10px]"
      >
       Are sure you want to delete?
      </h1>
       <p 
        className="text-center text-[15px] text-[#535862] font-[600]"
        >
          {selectedPost?.title}
        </p>
       <div className="flex justify-end items-center gap-[5px] mt-9">
          <button 
            className="text-[14px] text-[#334155] rounded-[8px] border-[1px] border-[#E2E8F0] cursor-pointer pl-[35px] pr-[35px] pt-[20px] pb-[20px]"
            onClick={() => setToggleDelete(false)}
           >
               Cancel
          </button>
          <button
            className="text-[14px] text-[#fff] pl-[35px] pr-[35px] pt-[20px] pb-[20px] rounded-[8px] border-[1px] border-[#E2E8F0] cursor-pointer bg-[red]"
            onClick={handleDeletePost}
          >
              Delete
          </button>
        </div>
    </div>
  )
};

export default DeletePost;
