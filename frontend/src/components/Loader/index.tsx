
import "./index.scss";

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center h-screen">
       <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoadingDots;