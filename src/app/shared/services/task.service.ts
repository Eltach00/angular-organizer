import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';

export interface ITask {
  id?: string;
  date?: string;
  title: string;
}

interface TaskResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  static url = 'https://organizer-9345c-default-rtdb.firebaseio.com/tasks';

  constructor(private http: HttpClient) {}

  loadTask(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(TaskService.url + `/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
        })
      );
  }

  removeTask({ id, date }: ITask) {
    return this.http.delete(TaskService.url + `/${date}` + `/${id}.json`);
    // .pipe(map(()=> {
    // }));
  }

  sendTasks(task: ITask): Observable<ITask> {
    return this.http
      .post<TaskResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(
        map((resp) => {
          return { ...task, id: resp.name };
        })
      );
  }
}
