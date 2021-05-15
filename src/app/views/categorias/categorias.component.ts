import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  categorias = [
    {
      title: "Manutenção de computadores", icon: 'assets/laptop.svg'
    },
    {
      title: "Desenvolvimento de sistemas", icon: 'assets/mouse.svg'
    },
    {
      title: "Manutenção mobile", icon: 'assets/tablet.svg'
    },
    {
      title: "Manutenção de videogames", icon: 'assets/videogames.svg'
    },
    {
      title: "Manutenção de outros", icon: 'assets/manutencao.svg'
    },
  ]

  ngOnInit(): void {
  }

}
