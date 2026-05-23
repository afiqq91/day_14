import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import InstructorForm from "../components/InstructorForm";

import {
    getInstructorById,
    updateInstructor
} from "../services/instructorApi";

function InstructorEditPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [instructor, setInstructor] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchInstructor() {

            try {

                const data = await getInstructorById(id);

                setInstructor(data);

            } catch (err) {

                console.error(err);

                setError("Instructor not found");

            } finally {

                setLoading(false);
            }
        }

        fetchInstructor();

    }, [id]);

    async function handleUpdateInstructor(data) {

        try {

            await updateInstructor(id, data);

            alert("Instructor updated successfully!");

            navigate("/instructors");

        } catch (err) {

            console.error(err);

            alert("Failed to update instructor");
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Edit Instructor</h1>

            <InstructorForm
                initialData={instructor}
                onSubmit={handleUpdateInstructor}
                buttonText="Update Instructor"
            />

        </div>
    );
}

export default InstructorEditPage;