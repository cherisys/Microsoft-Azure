import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<Array<Hero>>(`${this.apiUrl}/heroes`);
  }

  addHero(hero:Hero) {
    return this.http.post<Hero>(`${this.apiUrl}/hero`,hero);
  }

  updateHero(hero:Hero) {
    return this.http.put<Hero>(`${this.apiUrl}/hero/${hero.id}`,hero);
  }

  deleteHero(hero:Hero) {
    return this.http.delete(`${this.apiUrl}/hero/${hero.id}`);
  }
}
