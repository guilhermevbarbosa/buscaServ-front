import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-comp',
  templateUrl: './register-comp.component.html',
  styleUrls: ['./register-comp.component.scss']
})
export class RegisterCompComponent implements OnInit {
  @Output()
  public clickedBtn = new EventEmitter<MouseEvent>();

  public handleClick(event: MouseEvent) {
    this.clickedBtn.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
