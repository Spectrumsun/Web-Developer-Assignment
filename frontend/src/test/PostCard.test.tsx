import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "../components/PostCard";
import { vi } from "vitest";

const mockPost = {
  id: "1",
  title: "Test Post",
  body: "This is the body",
  user_id: "1",
};

describe("PostCard", () => {
  it("renders post title and body", () => {
    render(<PostCard post={mockPost} handleSelectDeletePost={() => {}} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("This is the body")).toBeInTheDocument();
  });

  it("calls delete handler when delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(<PostCard post={mockPost} handleSelectDeletePost={mockDelete} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockDelete).toHaveBeenCalledWith(mockPost);
  });
});