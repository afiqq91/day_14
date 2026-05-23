import { Link } from "react-router-dom";

function InstructorCard({
    instructor,
    isAdmin,
    onDelete
}) {

    return (

        <div
            className="card"
            style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px"
            }}
        >

            <h2>{instructor.name}</h2>

            <p>
                <strong>Email:</strong>
                {" "}
                {instructor.email}
            </p>

            <p>
                <strong>Specialization:</strong>
                {" "}
                {instructor.specialization}
            </p>

            <p>
                <strong>Experience:</strong>
                {" "}
                {instructor.yearsExperience}
                {" "}
                years
            </p>

            <p>
                <strong>Status:</strong>
                {" "}
                {
                    instructor.active
                        ? "Active"
                        : "Inactive"
                }
            </p>

            <Link to={`/instructors/${instructor.id}`}>
                View Details
            </Link>

            <br />

            {
                isAdmin && (
                    <>
                        <Link
                            to={`/instructors/${instructor.id}/edit`}
                        >
                            Edit
                        </Link>

                        {" | "}

                        <button
                            onClick={() =>
                                onDelete(instructor)
                            }
                        >
                            Delete
                        </button>
                    </>
                )
            }

        </div>
    );
}

export default InstructorCard;