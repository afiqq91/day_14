import { useEffect, useState } from "react";

import InstructorCard
from "../components/InstructorCard";

import {
    getAllInstructors,
    deleteInstructor
}
from "../services/instructorApi";

function InstructorListPage() {

    const [
        instructors,
        setInstructors
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");

    const [
        successMessage,
        setSuccessMessage
    ] = useState("");

    const role =
        localStorage.getItem(
            "role"
        );

    const isAdmin =
        role === "ADMIN";

    useEffect(() => {

        loadInstructors();

    }, []);

    async function loadInstructors() {

        try {

            const response =
                await getAllInstructors();

            setInstructors(
                response || []
            );

        } catch (err) {

            console.error(err);

            setError(
                "Could not load instructors."
            );

        } finally {

            setLoading(
                false
            );

        }

    }

    async function handleDeleteInstructor(
        instructor
    ) {

        const confirmed =

            window.confirm(

                `Delete ${instructor.name}?`

            );

        if (!confirmed) {

            return;

        }

        try {

            await deleteInstructor(

                instructor.id

            );

            const updatedInstructors =

                instructors.filter(

                    item =>

                        item.id !==

                        instructor.id

                );

            setInstructors(

                updatedInstructors

            );

            setSuccessMessage(

                "Instructor deleted successfully."

            );

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                "Could not delete instructor."

            );

            setSuccessMessage("");

        }

    }

    if (loading) {

        return (

            <h2>

                Loading...

            </h2>

        );

    }

    return (

        <div>

            <h1>

                Instructor List

            </h1>

            {

                successMessage &&

                <p>

                    {successMessage}

                </p>

            }

            {

                error &&

                <p>

                    {error}

                </p>

            }

            {

                instructors.map(

                    instructor => (

                        <InstructorCard

                            key={
                                instructor.id
                            }

                            instructor={
                                instructor
                            }

                            isAdmin={
                                isAdmin
                            }

                            onDelete={
                                handleDeleteInstructor
                            }

                        />

                    )

                )

            }

        </div>

    );

}

export default InstructorListPage;