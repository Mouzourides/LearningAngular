import {Injectable} from '@angular/core';
import {Hero} from './Hero';
import {Observable, of} from 'rxjs';
import {MessageService} from '../messages/message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {defaultHeroes} from './default-heros';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private allHeroesUrl = 'http://localhost:8080/api/heroes/all';
  private oneHeroUrl = 'http://localhost:8080/api/heroes/one?id=';
  private updateHeroUrl = 'http://localhost:8080/api/heroes/update';
  private addHeroUrl = 'http://localhost:8080/api/heroes/add';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.allHeroesUrl)
      .pipe(
        tap(() => this.log('Fetched all heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', defaultHeroes))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.post<Hero>(this.oneHeroUrl + id, {})
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`, defaultHeroes[id]))
      );
  }

  saveHero(updatedHero: Hero): Observable {
    return this.http.put(this.updateHeroUrl, updatedHero, this.httpOptions)
      .pipe(
        tap(() => this.log(`Updated hero name: ${updatedHero.name}`)),
        catchError(this.handleError('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.addHeroUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`Added hero: ${hero.name}`)),
        catchError(this.handleError<Hero>(`addHero: ${hero.name}`, hero))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
