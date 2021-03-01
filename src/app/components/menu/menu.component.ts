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
    console.log('ae')
  }

}
