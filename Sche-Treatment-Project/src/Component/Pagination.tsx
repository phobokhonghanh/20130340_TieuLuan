import { useState } from "react";
import "../assets/css/Pagination.css";
function Pagination({
  totalItems,
  itemsPerPage,
}: {
  totalItems: number;
  itemsPerPage: number;
}): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pagination = [];

    // Hiển thị nút prev nếu không phải ở trang đầu tiên
    if (currentPage !== 1) {
      pagination.push(
        <button key="prev" onClick={() => handleClick(currentPage - 1)}>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </button>
      );
    }
    // Hiển thị các trang
    for (let i = 1; i <= totalPages; i++) {
      // Hiển thị các trang đầu tiên
      if (i <= 3) {
        pagination.push(
          <button
            style={{ background: i === currentPage ? "#2e7df2" : "" }}
            key={i}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
      // Hiển thị dấu "..." sau trang thứ 3
      else if (i === 4) {
        pagination.push(<span key="">...</span>);
      }
      // Hiển thị các trang gần trang hiện tại
      else if (i >= currentPage - 1 && i <= currentPage + 1) {
        if (currentPage === 4) {
          pagination.push(
            <button
              style={{ background: "#2e7df2" }}
              key={currentPage}
              onClick={() => handleClick(i)}
            >
              {currentPage}
            </button>
          );
        }
        pagination.push(
          <button
            style={{ background: i === currentPage ? "#2e7df2" : "" }}
            key={i}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
      // Hiển thị dấu "..." trước trang cuối cùng
      else if (i === totalPages - 1) {
        pagination.push(<span key="ellipsis">...</span>);
      }
      // Hiển thị trang cuối cùng
      else if (i === totalPages) {
        pagination.push(
          <button
            style={{ background: i === currentPage ? "#2e7df2" : "" }}
            key={i}
            onClick={() => handleClick(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    // Hiển thị nút next nếu không phải ở trang cuối cùng
    if (currentPage !== totalPages) {
      pagination.push(
        <button key="next" onClick={() => handleClick(currentPage + 1)}>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      );
    }

    return pagination;
  };

  return <div className="pagination">{renderPagination()}</div>;
}

export default Pagination;
