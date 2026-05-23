import { Link } from "react-router-dom";

function InstructorCard({

    instructor,

    isAdmin,

    onDelete

}) {

    return (

        <div
            className="card"
        >

            <h2>

                {
                    instructor.name
                }

            </h2>

            <p>

                <strong>

                    Email:

                </strong>

                {" "}

                {
                    instructor.email
                }

            </p>

            <p>

                <strong>

                    Specialization:

                </strong>

                {" "}

                {
                    instructor.specialization
                }

            </p>

            <p>

                <strong>

                    Experience:

                </strong>

                {" "}

                {
                    instructor.yearsExperience
                }

                {" "}years

            </p>

            <p>

                <strong>

                    Status:

                </strong>

                {" "}

                {

                    instructor.active

                        ?

                        "Active"

                        :

                        "Inactive"

                }

            </p>

            <Link

                to={
                    `/instructors/${instructor.id}`
                }

            >

                View Details

            </Link>

            {" "}

            {

                isAdmin && (

                    <>

                        <Link

                            to={
                                `/instructors/${instructor.id}/edit`
                            }

                        >

                            Edit

                        </Link>

                        {" "}

                        <button

                            onClick={() =>

                                onDelete(

                                    instructor

                                )

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