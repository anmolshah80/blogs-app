'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import BlogsNotFound from '@/components/blogs-not-found';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls = ({
  currentPage,
  totalPages,
}: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // always show three page numbers centered around current page
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  const handleClick = (event: React.MouseEvent, page: number) => {
    // prevent default anchor element behavior
    event.preventDefault();

    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  if (currentPage > totalPages) return <BlogsNotFound />;

  return (
    <Pagination className="flex items-center justify-center space-x-2">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer hidden xs:block"
          hidden={currentPage === 1}
        >
          <PaginationPrevious
            size={'default'}
            href={currentPage === 2 ? '' : `?page=${currentPage - 1}`}
            onClick={(event) => handleClick(event, currentPage - 1)}
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem className="cursor-pointer" key={page}>
            <PaginationLink
              size={'default'}
              isActive={page === currentPage}
              href={page === 1 ? '' : `?page=${page}`}
              onClick={(event) => handleClick(event, page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages - 1 && totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem
          className="cursor-pointer hidden xs:block"
          hidden={currentPage === totalPages}
        >
          <PaginationNext
            size={'default'}
            href={`?page=${currentPage + 1}`}
            onClick={(event) => handleClick(event, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
