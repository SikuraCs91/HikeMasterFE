import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  active = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
