import { render, screen, fireEvent } from "@testing-library/react";
import AddPost from "../components/AddPost";
import { vi } from "vitest";

describe("AddPost Component", () => {
  const mockSetToggleAddPost = vi.fn();
  const mockHandleSubmit = vi.fn((e) => {
    e.preventDefault();
    return Promise.resolve();
  });
  const mockHandleOnChange = vi.fn();

  const defaultProps = {
    setToggleAddPost: mockSetToggleAddPost,
    title: "",
    body: "",
    error: { title: false, body: false },
    handleSubmit: mockHandleSubmit,
    handleOnChange: mockHandleOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with all fields", () => {
    render(<AddPost {...defaultProps} />);
    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Give your post a title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write something mind-blowing")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Publish")).toBeInTheDocument();
  });

  it("calls setToggleAddPost(false) when cancel is clicked", () => {
    render(<AddPost {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockSetToggleAddPost).toHaveBeenCalledWith(false);
  });

  it("calls handleOnChange when typing in inputs", () => {
    render(<AddPost {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText("Give your post a title"), {
      target: { value: "My Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write something mind-blowing"), {
      target: { value: "My Body" },
    });
    expect(mockHandleOnChange).toHaveBeenCalledTimes(2);
  });

  it("calls handleSubmit when publishing", async () => {
    render(<AddPost {...defaultProps} />);
    fireEvent.click(screen.getByText("Publish"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("shows validation errors when error props are true", () => {
    render(
      <AddPost
        {...defaultProps}
        error={{ title: true, body: true }}
      />
    );
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Body is required")).toBeInTheDocument();
  });
});