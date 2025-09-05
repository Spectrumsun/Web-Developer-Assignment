import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DeletePost from "../components/DeletePost";
import type { Post } from "../api";

describe("DeletePost Component", () => {
  const mockSetToggleDelete = vi.fn();
  const mockHandleDeletePost = vi.fn();

  const selectedPost: Post = {
    id: 1,
    title: "Sample Post",
    body: "This is a sample post body",
    userId: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the confirmation message", () => {
    render(
      <DeletePost
        setToggleDelete={mockSetToggleDelete}
        selectedPost={selectedPost}
        handleDeletePost={mockHandleDeletePost}
      />
    );

    expect(
      screen.getByText("Are sure you want to delete?")
    ).toBeInTheDocument();
    expect(screen.getByText("Sample Post")).toBeInTheDocument();
  });

  it("calls setToggleDelete(false) when Cancel is clicked", () => {
    render(
      <DeletePost
        setToggleDelete={mockSetToggleDelete}
        selectedPost={selectedPost}
        handleDeletePost={mockHandleDeletePost}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockSetToggleDelete).toHaveBeenCalledWith(false);
  });

  it("calls handleDeletePost when Delete is clicked", () => {
    render(
      <DeletePost
        setToggleDelete={mockSetToggleDelete}
        selectedPost={selectedPost}
        handleDeletePost={mockHandleDeletePost}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockHandleDeletePost).toHaveBeenCalled();
  });

  it("renders without crashing if selectedPost is null", () => {
    render(
      <DeletePost
        setToggleDelete={mockSetToggleDelete}
        selectedPost={null}
        handleDeletePost={mockHandleDeletePost}
      />
    );

    // It should show the confirmation message but no post title
    expect(
      screen.getByText("Are sure you want to delete?")
    ).toBeInTheDocument();
  });
});