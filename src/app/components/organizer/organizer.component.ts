import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ITask, TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  constructor(public dateServ: DataService, private taskServ: TaskService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: ITask = {
      title,
      date: this.dateServ.date.value.format('DD-MM-YYYY'),
    };
    this.taskServ.sendTasks(task).subscribe(
      () => {
        this.form.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
