import { TokenService } from 'src/app/services/token-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public tokenService:TokenService) { }

  ngOnInit(): void {
  }

}
