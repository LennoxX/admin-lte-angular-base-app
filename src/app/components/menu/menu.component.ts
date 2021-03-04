import { TokenService } from './../../services/token-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public tokenService:TokenService) { }

  ngOnInit(): void {
  }


  formatNome(nome: string){
    var nomes = nome.split(" ", 2)
    var nomeFinal = "";
    nomes.forEach(e => {
      nomeFinal = nomeFinal + e + " ";
    })
    return nomeFinal
  }

}
