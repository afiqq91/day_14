function Pagination({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange
}) {

    return (

        <div
            style={{
                marginBottom: "20px"
            }}
        >

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(
                        currentPage - 1
                    )
                }
            >
                Previous
            </button>

            <span>

                {" "}

                Page

                {" "}

                {currentPage}

                {" "}

                of

                {" "}

                {totalPages}

                {" "}

            </span>

            <button
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(
                        currentPage + 1
                    )
                }
            >
                Next
            </button>

            {" "}

            <select
                value={pageSize}
                onChange={(e) =>
                    onPageSizeChange(
                        Number(
                            e.target.value
                        )
                    )
                }
            >

                <option value={3}>
                    3 per page
                </option>

                <option value={5}>
                    5 per page
                </option>

                <option value={10}>
                    10 per page
                </option>

            </select>

        </div>
    );
}

export default Pagination;