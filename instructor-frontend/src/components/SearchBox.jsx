function SearchBox({
    searchTerm,
    onSearchChange,
    resultCount,
    totalCount
}) {

    return (

        <div
            style={{
                marginBottom: "20px"
            }}
        >

            <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={
                    (e) =>
                        onSearchChange(
                            e.target.value
                        )
                }
            />

            <button
                onClick={() =>
                    onSearchChange("")
                }
            >
                Clear
            </button>

            <p>

                Results:

                {" "}

                {resultCount}

                {" / "}

                {totalCount}

            </p>

        </div>
    );
}

export default SearchBox;