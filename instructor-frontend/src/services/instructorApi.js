import axios from "axios";

// Day 13 Exercise 5
const BASE_URL = "http://localhost:8080/api/instructors";

export async function getAllInstructors() {

    const response = await fetch(BASE_URL);

    return response.json();
}

export async function getInstructorById(id) {

    const response = await fetch(`${BASE_URL}/${id}`);

    return response.json();
}

export async function createInstructor(instructorData) {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        BASE_URL,
        instructorData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function updateInstructor(id, instructorData) {

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(instructorData),
    });

    return response.json();
}

export async function deleteInstructor(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete instructor");
    }

    return true;
}