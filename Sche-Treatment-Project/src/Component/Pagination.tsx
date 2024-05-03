import "../assets/css/Pagination.css";
function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  totalPage: number;
  currentPage: number;
  setCurrentPage(page: number): void;
}): JSX.Element {
  const totalPages = totalPage;

  const renderPagination = () => {
    const pagination = [];

    // Hiển thị nút prev nếu không phải ở trang đầu tiên
    if (currentPage !== 1) {
      pagination.push(
        <a
          className="btn-pagination"
          style={{}}
          key="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </a>
      );
    }
    // Hiển thị các trang
    for (let i = 1; i <= totalPages; i++) {
      // Hiển thị các trang đầu tiên
      if (i <= 3) {
        pagination.push(
          <a
            className="btn btn-pagination"
            onClick={() => setCurrentPage(i)}
            style={{
              width: "auto",
              background: i === currentPage ? "#2e7df2" : "",
            }}
            key={i}
          >
            {i}
          </a>
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
            <a
              className="btn btn-pagination"
              style={{ width: "auto", background: "#2e7df2" }}
              key={currentPage}
              onClick={() => setCurrentPage(i)}
            >
              {currentPage}
            </a>
          );
        }
        pagination.push(
          <a
            className="btn btn-pagination"
            style={{
              background: i === currentPage ? "rgb(190 207 231);" : "",
            }}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </a>
        );
      }
      // Hiển thị dấu "..." trước trang cuối cùng
      else if (i === totalPages - 1) {
        pagination.push(<span key="ellipsis">...</span>);
      }
      // Hiển thị trang cuối cùng
      else if (i === totalPages) {
        pagination.push(
          <a
            className="btn btn-pagination"
            style={{
              background: i === currentPage ? "#2e7df2" : "",
            }}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {totalPages}
          </a>
        );
      }
    }

    // Hiển thị nút next nếu không phải ở trang cuối cùng
    if (currentPage !== totalPages) {
      pagination.push(
        <a
          className="btn-pagination"
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      );
    }

    return pagination;
  };

  return <div className="pagination">{renderPagination()}</div>;
}

export default Pagination;
