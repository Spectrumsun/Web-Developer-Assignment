import { useEffect, useState } from "react";
import "./index.scss";

interface Props {
  children: React.ReactNode;
  toggle: boolean; // controls open/close
  mainBackground?: string;
  maxWidth?: string;
  maxHeight?: string;
  background?: string;
  overflow?: "auto" | "hidden" | "scroll";
  zIndex?: number;
}

const Modal = ({
  children,
  toggle,
  mainBackground = "rgba(0, 0, 0, 0.2)",
  maxWidth = "40%",
  maxHeight = "auto",
  background = "#fefefe",
  overflow = "auto",
  zIndex = 1000,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (toggle) {
      setIsModalVisible(true); // open modal
    } else {
      // add closing animation delay
      const timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [toggle]);

  if (!isModalVisible) return null;

  return (
    <div
      className="modal"
      style={{
        zIndex,
        background: mainBackground,
      }}
    >
      <div
        className={`modal__content ${
          toggle ? "modal__content-open" : "modal__content-close"
        }`}
        style={{
          width: maxWidth,
          maxHeight,
          background,
          overflow,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;