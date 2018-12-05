import { Component, OnInit } from '@angular/core';
import {Heroes} from '../Heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  protected hero: Heroes = {
    id: 1,
    name: 'Thor'
  };

  constructor() { }

  ngOnInit() {
  }

}
