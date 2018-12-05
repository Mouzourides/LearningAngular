import {Component, OnInit} from '@angular/core';
import {Hero} from '../Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  protected heroes: Hero[] = [
    {
      id: 0,
      name: 'Thor'
    },
    {
      id: 1,
      name: 'Iron Man'
    },
    {
      id: 2,
      name: 'Hulk'
    },
    {
      id: 3,
      name: 'Captain America'
    },
  ];

  protected selectedHero: Hero;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
