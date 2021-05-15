import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.scss']
})
export class CardCategoriasComponent implements OnInit {
  @Input() title: string = "";
  @Input() icon: string = "";

  constructor() { }

  ngOnInit(): void {
  }


}
