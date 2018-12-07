import {Component, OnInit} from '@angular/core';
import {Hero} from './Hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  protected heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(heroName: string) {
    heroName = heroName.trim();
    if (!heroName) { return; }

    this.heroes.sort((a, b) => a.id + b.id);
    const id: number = this.heroes[this.heroes.length - 1].id + 1;

    this.heroService.addHero({id, name: heroName} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id)
      .subscribe(() => {
        this.heroes = this.heroes.filter((h) => h.id !== id);
      });
  }
}
