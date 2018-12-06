import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import { Observable, of } from 'rxjs';
import {MessageService} from '../messages/message.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private allHeroesUrl = 'http://localhost:8080/api/heroes/all';
  private oneHeroUrl = 'http://localhost:8080/api/heroes/one?id=';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.allHeroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched a hero');
    return this.http.post<Hero>(this.oneHeroUrl + id, {});
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
