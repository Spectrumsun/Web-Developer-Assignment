// src/components/PostCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "../components/PostCard";

const mockPost = {
  id: "1",
  title: "Test Post",
  body: "This is the body",
};

describe("PostCard", () => {
  it("renders post title and body", () => {
    render(<PostCard post={mockPost} handleDeletePost={() => {}} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("This is the body")).toBeInTheDocument();
  });

  it("calls delete handler when delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(<PostCard post={mockPost} handleDeletePost={mockDelete} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockDelete).toHaveBeenCalledWith(mockPost);
  });
});