import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MovieProvider
  ] 
})

export class FeedPage {
  
  public objeto_feed = {
    titulo:"Edson do Amaral Januario",
    data:"January 26, 1992",
    comentario:"Show este meu primeiro App.",
    qntd_like:12,
    qntd_comments:4,
    time_comment:"11h ago teste"
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider
    ) {
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovie().subscribe(
      data=>{
        console.log(data);
      }, error=>{
        console.log(error);
      }
    )
  }

}
