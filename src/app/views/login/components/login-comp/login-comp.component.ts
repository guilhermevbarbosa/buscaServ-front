import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {
  @Output()
  public clickedBtn = new EventEmitter<MouseEvent>();

  public handleClick(event: MouseEvent) {
    this.clickedBtn.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
