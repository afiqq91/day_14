package com.example.instructor_api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    private List<Instructor> instructors = new ArrayList<>();

    @GetMapping
    public List<Instructor> getAllInstructors() {
        return instructors;
    }

    @PostMapping
    public Instructor createInstructor(
            @RequestBody Instructor instructor
    ) {

        instructors.add(instructor);

        return instructor;
    }

    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable int id) {
        return instructors.get(id);
    }

    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable int id, @RequestBody Instructor updatedInstructor) {
        instructors.set(id, updatedInstructor);
        return updatedInstructor;
    }
}

class Instructor {

    public String name;
    public String email;
    public String specialization;
    public int yearsExperience;
    public boolean active;
}
