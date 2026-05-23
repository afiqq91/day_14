import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import InstructorCard from "../components/InstructorCard";

import {
    getAllInstructors,
    deleteInstructor
} from "../services/instructorApi";

export default function InstructorListPage() {

    const [instructors, setInstructors] = useState([]);

    const role = localStorage.getItem("role");

    const isAdmin = role === "ADMIN";

    useEffect(() => {

        async function fetchInstructors() {

            try {

                const data = await getAllInstructors();

                setInstructors(data);

            } catch (error) {

                console.error(error);
            }
        }

        fetchInstructors();

    }, []);

    async function handleDeleteInstructor(
        instructor
    ) {

        try {

            await deleteInstructor(
                instructor.id
            );

            setInstructors(

                instructors.filter(

                    item =>
                        item.id !== instructor.id
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete instructor"
            );
        }
    }

    return (

        <div>

            <h1>
                Instructor List Page
            </h1>

            {
                isAdmin && (

                    <Link
                        to="/instructors/create"
                    >

                        <button>

                            Create Instructor

                        </button>

                    </Link>
                )
            }

            {
                instructors.map(
                    (instructor) => (

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