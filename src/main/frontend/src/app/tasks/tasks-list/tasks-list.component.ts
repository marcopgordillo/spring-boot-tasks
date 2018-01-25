import {Component, OnDestroy, OnInit} from '@angular/core';

import {Task} from "../task.model";
import {TaskService} from "../task.service";
import {ISubscription} from "rxjs/Subscription";

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {

    private tasks: Task[] = [];
    private taskGetSubscription: ISubscription;
    private taskChangedSubscription: ISubscription;
    private taskAddedSubscription: ISubscription;


    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskGetSubscription = this.taskService.getTasks()
            .subscribe(
                (tasks: any[]) => this.tasks = tasks,
                (error) => console.error(error)
            );

        this.taskAddedSubscription = this.taskService.onTaskAdded.subscribe(
            (task: Task) => this.tasks.push(task)
        );
    }

    getDueDateLabel(task: Task){
        return task.completed ? 'badge-success' : 'badge-primary';
    }

    onTaskChange(event, task) {
        //console.log('Task has changed');
        this.taskChangedSubscription = this.taskService.saveTask(task, event.target.checked).subscribe();
    }

    ngOnDestroy() {
        this.taskGetSubscription.unsubscribe();
        this.taskChangedSubscription.unsubscribe();
        this.taskAddedSubscription.unsubscribe();
    }

}
