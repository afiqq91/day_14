import { useNavigate } from "react-router-dom";

import InstructorForm from "../components/InstructorForm";

import {
    createInstructor
} from "../services/instructorApi";

function InstructorCreatePage() {

    const navigate =
        useNavigate();

    async function handleCreateInstructor(
        instructorData
    ) {

        try {

            await createInstructor(

                instructorData

            );

            navigate(

                "/instructors"

            );

        } catch (err) {

            console.error(
                err
            );

            alert(

                JSON.stringify(

                    err.response?.data,

                    null,

                    2

                )

                ||

                err.message

                ||

                "Failed to create instructor"

            );
        }
    }

    return (

        <div>

            <h1>

                Create Instructor

            </h1>

            <InstructorForm

                onSubmit={

                    handleCreateInstructor

                }

                buttonText=

                "Create Instructor"

            />

        </div>
    );
}

export default InstructorCreatePage;