package com.example.service;

import com.example.domain.Task;

public interface TaskService {

    Iterable<Task> list();

    Task save(Task task);
}
