import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { ITask, TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: ITask[];
  constructor(public dateServ: DataService, private taskServ: TaskService) {}

  ngOnInit(): void {
    this.dateServ.date
      .pipe(
        switchMap((date: moment.Moment) => {
          return this.taskServ.loadTask(date);
        })
      )
      .subscribe((resp) => {
        this.tasks = resp;
      });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  deleteTask(task: ITask) {
    this.taskServ.removeTask(task).subscribe({
      next: (resp) => {
        this.tasks = this.tasks.filter((item) => item.id !== task.id);
      },
      error: (e) => console.log(e),
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: ITask = {
      title,
      date: this.dateServ.date.value.format('DD-MM-YYYY'),
    };
    this.taskServ.sendTasks(task).subscribe({
      next: (resp) => {
        this.form.reset();
        this.tasks.push(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
