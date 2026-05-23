package com.example.instructor_api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    private List<Instructor>
            instructors =
            new ArrayList<>();

    private Long nextId = 1L;

    @GetMapping
    public List<Instructor>
    getAllInstructors() {

        return instructors;

    }

    @PostMapping
    public Instructor
    createInstructor(

            @RequestBody
            Instructor instructor

    ) {

        instructor.id =
                nextId++;

        instructors.add(
                instructor
        );

        return instructor;

    }

    @GetMapping("/{id}")
    public Instructor
    getInstructorById(

            @PathVariable
            Long id

    ) {

        return instructors

                .stream()

                .filter(

                        instructor ->

                                instructor.id

                                        .equals(id)

                )

                .findFirst()

                .orElse(null);

    }

    @PutMapping("/{id}")
    public Instructor
    updateInstructor(

            @PathVariable
            Long id,

            @RequestBody
            Instructor updatedInstructor

    ) {

        for (

                int i = 0;

                i < instructors.size();

                i++

        ) {

            if (

                    instructors

                            .get(i)

                            .id

                            .equals(id)

            ) {

                updatedInstructor.id =
                        id;

                instructors.set(

                        i,

                        updatedInstructor

                );

                return updatedInstructor;

            }

        }

        return null;

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteInstructor(

            @PathVariable
            Long id

    ) {

        boolean removed =

                instructors.removeIf(

                        instructor ->

                                instructor.id

                                        .equals(id)

                );

        if (!removed) {

            return ResponseEntity

                    .notFound()

                    .build();

        }

        return ResponseEntity

                .noContent()

                .build();

    }

}

class Instructor {

    public Long id;

    public String name;

    public String email;

    public String specialization;

    public int yearsExperience;

    public boolean active;

}