import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges() {
    if (this.loading == true) {
      this.handlePage();
    } else {
      this.bodyNormal();
    }
  }

  handlePage() {
    window.scroll(0, 0);
    document.body.style.overflow = 'hidden';
  }

  bodyNormal() {
    document.body.style.overflow = 'auto';
  }
}
