import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

const TITLE_PLACEHOLDER = '{MOVIE_TITLE}';
const IMDB_PLACEHOLDER = '{MOVIE_IMDB}';

const BASE_URL = 'http://www.omdbapi.com/?apikey=f7b79969'

const DETAIL_URL = BASE_URL + '&i=' + IMDB_PLACEHOLDER;
const SEARCH_URL = BASE_URL + '&s=' + TITLE_PLACEHOLDER;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  @ViewChild('btnBack', {static: false}) btnBack:ElementRef;
  @ViewChild('btnNewSearch', {static: false}) btnNewSearch:ElementRef;
  @ViewChild('searchInput', {static: false}) searchInput:ElementRef;

  movies:Array<Movie> = new Array();
  selectedIndex:number = 0;
  message:String = "";
  faceIndex:number = 1;
  selectedMov:Movie;

  hasFocus:Boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  keyPress(event: any) {
      if(this.faceIndex === 1){
        switch(event.key){
          case 'ArrowUp':
            this.navigateY(-1);
          break;
          case 'ArrowDown':
              this.navigateY(1);
          break;
          case 'ArrowRight':
            this.navigateX(1);
          break;
          case 'ArrowLeft':
              this.navigateX(-1);
          break;
          case 'Enter':
              if(event.target.tagName != "INPUT") this.cardOnEnter();
          break;
        }
      }else{
        switch(event.key){
          case 'ArrowRight':
              this.btnNewSearch.nativeElement.focus();
          break;
          case 'ArrowLeft':
              this.btnBack.nativeElement.focus();
          break;
      }
    }
  }

  navigateY(direction:Number){
    let tmpIndex = 0;
    let qtdCols = this.getQtdCols();

    if(direction < 0){
      tmpIndex = this.selectedIndex - qtdCols;
    }else{
      tmpIndex = this.selectedIndex + qtdCols;
    }

    if(tmpIndex < 0){
      return;
    }

    if(tmpIndex > (this.movies.length - 1)){      
      //Tratativa para ir pra o utilmo registro, caso nao tenha coluna na posicao atual
      tmpIndex =  this.movies.length - 1;
    }

    this.selectItem(tmpIndex);
  }

  navigateX(direction:number){

    if( (this.selectedIndex === 0 && direction === -1) || 
        (this.selectedIndex === (this.movies.length -1) && direction === 1) ){
      return;
    }

    this.selectItem(this.selectedIndex + direction);
  }

  getQtdCols():number{
    let winWidth = window.innerWidth;
    if(winWidth <= 575){
      return 1;
    }
    
    if(winWidth > 575 && winWidth<= 767){
      return 2;
    }

    if(winWidth > 767 && winWidth<= 991){
      return 3;
    }

    return 4;
  }

  selectItem(index:number){
    this.movies[this.selectedIndex].selected = false;
    this.selectedIndex = index;
    this.movies[this.selectedIndex].selected = true;
  }

  onEnter($event){
    let value = $event.value;
    if(value != undefined){
      this.http.get(SEARCH_URL.replace(TITLE_PLACEHOLDER, value)).subscribe(resp => {
        this.movies = [];
        if(resp['Response'] === 'True'){
          
          resp['Search'].forEach(movie => {
              this.movies.push(new Movie(movie.Title, movie.Poster, false, movie.imdbID));
          });

          this.selectItem(0);
          this.message = this.movies.length + " resultados encontrado" + (this.movies.length > 1 ? "s" : "") + " para '" + value + "'";
          
          $event.target.blur();
        }else{
          this.message = "Nenum resultado encontrado para '" + value + "'";
        }
      });      
    }
  }

  cardOnEnter(){
    this.selectedMov = this.movies[this.selectedIndex];
    
    this.http.get(DETAIL_URL.replace(IMDB_PLACEHOLDER, this.selectedMov.imdb)).subscribe(resp => {
      this.selectedMov.year = resp['Year'];
      this.selectedMov.runtime = resp['Runtime'];
      this.selectedMov.genre = resp['Genre'];
      this.selectedMov.plot = resp['Plot'];
      this.selectedMov.actors = resp['Actors'];
      this.selectedMov.director = resp['Director'];
      this.selectedMov.language = resp['Language'];
      this.selectedMov.imdbRating = resp['imdbRating'];
      this.selectedMov.metascore = resp['Metascore'] == 'N/A' ? '' : resp['Metascore'];
    });

    this.changeFace(2);
    setTimeout(() => {this.btnBack.nativeElement.focus(); } );
  }

  onCardClick(index){
    this.selectItem(index);
    this.cardOnEnter();
  }

  newSearch(){
    this.message = '';
    this.movies = [];    
    this.changeFace(1);
  }

  back(){
    this.changeFace(1);
  }

  changeFace(toIndex:number){
    this.faceIndex = toIndex;
  }
}