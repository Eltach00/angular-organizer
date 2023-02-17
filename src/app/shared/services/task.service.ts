import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface ITask {
  id?: number;
  date?: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  static url = 'https://organizer-9345c-default-rtdb.firebaseio.com/tasks';

  constructor(private http: HttpClient) {}

  sendTasks(task: ITask) {
    return this.http.post(`${TaskService.url}/${task.date}.json`, task).pipe(
      map((resp) => {
        console.log(resp);
        return resp;
      })
    );
  }
}
