import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "../components/Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page numbers when totalPages <= 5", () => {
    render(<Pagination currentPage={2} totalPages={4} onPageChange={mockOnPageChange} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("disables 'Previous' button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables 'Next' button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("shows ellipsis when there are many pages", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("navigates with 'Next' and 'Previous'", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});