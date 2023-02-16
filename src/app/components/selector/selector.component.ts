import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  constructor(public dateServ: DataService) {}

  go(dir: number) {
    this.dateServ.changeMonth(dir);
  }
}
