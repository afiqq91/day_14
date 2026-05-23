import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import InstructorCard from "../components/InstructorCard";

import SearchBox from "../components/SearchBox";

import {
    getAllInstructors,
    deleteInstructor
} from "../services/instructorApi";

export default function InstructorListPage() {

    const [
        instructors,
        setInstructors
    ] = useState([]);

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");

    const role =
        localStorage.getItem(
            "role"
        );

    const isAdmin =
        role === "ADMIN";

    useEffect(() => {

        async function fetchInstructors() {

            try {

                const data =
                    await getAllInstructors();

                setInstructors(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
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

            console.error(
                error
            );

            alert(
                "Failed to delete instructor"
            );
        }
    }

    const filteredInstructors =
        instructors.filter(
            (instructor) => {

                const term =
                    searchTerm.toLowerCase();

                return (

                    instructor.name
                        ?.toLowerCase()
                        .includes(
                            term
                        )

                    ||

                    instructor.email
                        ?.toLowerCase()
                        .includes(
                            term
                        )

                    ||

                    instructor.specialization
                        ?.toLowerCase()
                        .includes(
                            term
                        )

                    ||

                    (
                        instructor.active
                            ? "active"
                            : "inactive"
                    )
                        .includes(
                            term
                        )
                );
            }
        );

    return (

        <div>

            <h1>
                Instructor List Page
            </h1>

            <SearchBox

                searchTerm={
                    searchTerm
                }

                onSearchChange={
                    setSearchTerm
                }

                resultCount={
                    filteredInstructors.length
                }

                totalCount={
                    instructors.length
                }

            />

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
                filteredInstructors.map(
                    (
                        instructor
                    ) => (

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