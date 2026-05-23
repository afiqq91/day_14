import { useNavigate } from "react-router-dom";
import InstructorForm from "../components/InstructorForm";
import { createInstructor } from "../services/instructorApi";

function InstructorCreatePage() {

    const navigate = useNavigate();

    async function handleCreateInstructor(data) {

        try {

            await createInstructor(data);

            alert("Instructor created successfully!");

            navigate("/instructors");

        } catch (error) {

            console.error(error);

            alert("Failed to create instructor");
        }
    }

    return (
        <div>

            <h1>Create Instructor</h1>

            <InstructorForm
                initialData={null}
                onSubmit={handleCreateInstructor}
                buttonText="Create Instructor"
            />

        </div>
    );
}

export default InstructorCreatePage;