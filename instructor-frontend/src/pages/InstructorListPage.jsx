import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import InstructorCard from "../components/InstructorCard";

import SearchBox from "../components/SearchBox";

import Pagination from "../components/Pagination";

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

    const [
        currentPage,
        setCurrentPage
    ] = useState(1);

    const [
        pageSize,
        setPageSize
    ] = useState(3);

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

    const totalPages =
        Math.ceil(
            filteredInstructors.length
            /
            pageSize
        );

    const startIndex =
        (
            currentPage - 1
        )
        *
        pageSize;

    const paginatedInstructors =
        filteredInstructors.slice(
            startIndex,
            startIndex + pageSize
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
                    (
                        value
                    ) => {

                        setSearchTerm(
                            value
                        );

                        setCurrentPage(
                            1
                        );
                    }
                }

                resultCount={
                    filteredInstructors.length
                }

                totalCount={
                    instructors.length
                }

            />

            <Pagination

                currentPage={
                    currentPage
                }

                totalPages={
                    totalPages
                }

                pageSize={
                    pageSize
                }

                onPageChange={
                    setCurrentPage
                }

                onPageSizeChange={
                    (
                        size
                    ) => {

                        setPageSize(
                            size
                        );

                        setCurrentPage(
                            1
                        );
                    }
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
                paginatedInstructors.map(
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