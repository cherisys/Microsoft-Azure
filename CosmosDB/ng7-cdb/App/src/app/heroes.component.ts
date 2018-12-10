import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  addingHero: boolean = false;
  heroes:any = [];
  selectedHero:Hero;
  selectedClone:Hero;
  errorMessage:string = '';

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(){
    return this.heroService.getHeroes().subscribe(heroes=>{
      this.heroes = heroes;
    });
  }

  deleteHero(hero:Hero){
    this.heroService.deleteHero(hero).subscribe(res=>{
      this.heroes = this.heroes.filter(h=>h!==hero);
      if(this.selectedHero === hero){
        this.selectedHero = null;
        this.errorMessage = '';
      }
    });
  }

  enableAddMode(){
    this.addingHero = true;
    this.selectedHero = new Hero();
    this.errorMessage ='';
  }

  onSelect(hero: Hero){
    this.addingHero = false;
    this.selectedHero = hero;
    this.selectedClone = {...hero};
    this.errorMessage ='';
  }

  save(){
    this.errorMessage = '';
    if(this.addingHero){
      this.heroService.addHero(this.selectedHero).subscribe(hero=>{
        this.addingHero = false;
        this.selectedHero = null;
        this.heroes.push(hero);
      }, err => {
        this.errorMessage = err.error.error;
      });
    } else {
      this.heroService.updateHero(this.selectedHero).subscribe(hero=>{
        this.addingHero = false;
        this.selectedHero = null;
        this.errorMessage = '';
      });
    }
  }

  cancel(){
    this.addingHero = false;
    let heroIndex = this.heroes.findIndex(x=>x===this.selectedHero);
    if(heroIndex>-1) this.heroes.splice(heroIndex, 1, this.selectedClone);
    this.selectedHero = null;
    this.selectedClone = null;
    this.errorMessage = '';
  }
}
