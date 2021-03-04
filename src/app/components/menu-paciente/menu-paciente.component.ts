import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token-service.service';

@Component({
  selector: 'app-menu-paciente',
  templateUrl: './menu-paciente.component.html',
  styleUrls: ['./menu-paciente.component.css']
})
export class MenuPacienteComponent implements OnInit {

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
