import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    
  }

}

export class Card {
  constructor(
    public abertura?: string,
    public maxima?: string,
    public atual?: string,
    public variacaoAbs?: string,
    public variacaoRel?: string,
    public diaHora?: string,
  ) {
  }

  static fromJson(jsonData: any): Card {
    return Object.assign(new Card(), jsonData);
  }
}
