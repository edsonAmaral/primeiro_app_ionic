import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private BaseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovie(page?: number){
    return this.http.get(this.BaseApiPath +`/movie/popular?page=${page}&api_key=5c57a89f22563b9da61039cfebae726d&language=pt-BR`);
  }

  getMovieDetail(filmeId){
    return this.http.get(this.BaseApiPath + `/movie/${filmeId}?api_key=5c57a89f22563b9da61039cfebae726d&language=pt-BR`);
  }
}
