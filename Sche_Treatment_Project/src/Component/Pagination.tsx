import { Pagination } from "react-bootstrap";

import "../assets/css/Pagination.css";

function PaginationCustom({
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  totalPage: number;
  currentPage: number;
  setCurrentPage(page: number): void;
}): JSX.Element {
  // function CustomPagination({ totalPage, currentPage, setCurrentPage }) {
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Hàm để tạo danh sách các trang cần hiển thị
  const getPageItems = () => {
    const pageItems = [];
    const maxVisiblePages = 5; // Số trang tối đa hiển thị trước khi sử dụng dấu ba chấm

    if (totalPage <= maxVisiblePages) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng maxVisiblePages, hiển thị toàn bộ
      for (let i = 1; i <= totalPage; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageClick(i)}
            style={{ borderBottom: "none" }}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // Nếu tổng số trang lớn hơn maxVisiblePages, sử dụng dấu ba chấm
      const leftEllipsis = currentPage > 2;
      const rightEllipsis = currentPage < totalPage - 1;

      pageItems.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageClick(1)}
          style={{ borderBottom: "none" }}
        >
          1
        </Pagination.Item>
      );

      if (leftEllipsis) {
        pageItems.push(<Pagination.Ellipsis key="left-ellipsis" />);
      }

      let start = Math.max(currentPage - 1, 2);
      let end = Math.min(currentPage + 1, totalPage - 1);

      for (let i = start; i <= end; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageClick(i)}
            style={{ borderBottom: "none" }}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (rightEllipsis) {
        pageItems.push(<Pagination.Ellipsis key="right-ellipsis" />);
      }

      pageItems.push(
        <Pagination.Item
          style={{ borderBottom: "none" }}
          key={totalPage}
          active={totalPage === currentPage}
          onClick={() => handlePageClick(totalPage)}
        >
          {totalPage}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <>
      {totalPage == 0 && (
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            color: "rgb(177 177 177)",
            fontWeight: "bold",
            textShadow: "rgb(193 189 189 / 54%) 1px 1px 3px",
            fontFamily: "'Arial Narrow', sans-serif",
          }}
        >
          <span>Không có dữ liệu</span>
        </div>
      )}
      <Pagination>
        <Pagination.First onClick={() => handlePageClick(1)} />
        <Pagination.Prev
          onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        />

        {getPageItems()}

        <Pagination.Next
          onClick={() => handlePageClick(Math.min(currentPage + 1, totalPage))}
        />
        <Pagination.Last onClick={() => handlePageClick(totalPage)} />
      </Pagination>
    </>
  );
}

export default PaginationCustom;
