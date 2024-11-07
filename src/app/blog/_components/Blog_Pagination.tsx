/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Blog_Pagination = ({page,handlePageChange,totalPages}:any) => {

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
    
        if (totalPages <= maxVisiblePages) {
          for (let i = 1; i <= totalPages; i++) {
            items.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(i)}
                  isActive={page === i}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }
        } else {
          const leftBound = Math.max(1, page - Math.floor(maxVisiblePages / 2));
          const rightBound = Math.min(totalPages, leftBound + maxVisiblePages - 1);
    
          if (leftBound > 1) {
            items.push(
              <PaginationItem key="start-ellipsis">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
    
          for (let i = leftBound; i <= rightBound; i++) {
            items.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(i)}
                  isActive={page === i}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }
    
          if (rightBound < totalPages) {
            items.push(
              <PaginationItem key="end-ellipsis">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
        }
    
        return items;
      };




  return (
    <Pagination className="text-black">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          aria-disabled={page === 1}
        />
      </PaginationItem>
      {renderPaginationItems()}
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          aria-disabled={page === totalPages}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  );
};

export default Blog_Pagination;