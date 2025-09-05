interface Props {
  setToggleAddPost: (toggle: boolean) => void;
  title: string;
  body: string;
  error: {
    title: boolean;
    body: boolean;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AddPost = ({ 
  setToggleAddPost, 
  error, 
  title, 
  body, 
  handleSubmit, 
  handleOnChange, 
}: Props) => {
  return (
     <div className="p-[20px]">
      <h1 className="text-[36px] font-[500] text-[#181D27] mb-[20px]">New Post</h1>
      <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <label className="text-[18px] text-[#535862]">Post title</label>
        <input 
          type="text" 
          name="title" 
          className={`text-[14px] text-[#94A3B8] p-[15px] border-[1px] rounded-[8px] resize-none ${error.body ? 'border-[red]' : 'border-[#E2E8F0]'}`} 
          placeholder="Give your post a title"
          value={title}
          onChange={handleOnChange}
        />
          {
            error.title ? <span className="text-[red] text-[10px]">Title is required</span> : null
          }
          <label className="text-[18px] text-[#535862]">Post content</label>
          <textarea 
            name="body" 
            rows={8}
            className={`text-[14px] text-[#94A3B8] p-[15px] border-[1px] rounded-[8px] resize-none ${error.body ? 'border-[red]' : 'border-[#E2E8F0]'}`} 
            placeholder='Write something mind-blowing'
            value={body}
            onChange={handleOnChange}
          />
          {
            error.body ? <span className="text-[red] text-[10px]">Body is required</span> : null
           }

          <div className="flex justify-end items-center gap-[5px] mt-9">
          <button 
            className="text-[14px] text-[#334155] rounded-[8px] border-[1px] border-[#E2E8F0] cursor-pointer pl-[35px] pr-[35px] pt-[20px] pb-[20px]"
            onClick={() => setToggleAddPost(false)}
           >
               Cancel
          </button>
          <button
            className="text-[14px] text-[#fff] pl-[35px] pr-[35px] pt-[20px] pb-[20px] rounded-[8px] border-[1px] border-[#E2E8F0] cursor-pointer bg-[#334155]"
            >
              Publish
            </button>
        </div>
      </form>
    </div>
  )
};

export default AddPost;
