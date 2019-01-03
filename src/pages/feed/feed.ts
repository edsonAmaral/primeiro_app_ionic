import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
    time_comment:"11h ago"
  }

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public page = 1;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  abrirDetalhe(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  abreCarregamento() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregamento(){
    this.loader.dismiss();
  }

  public lista_filmes = new Array<any>();

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregamento();
    this.movieProvider.getLatestMovie(this.page).subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        
        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();
          console.log(this.page);
        }else{
          this.lista_filmes = objeto_retorno.results;
        }
        
        console.log(objeto_retorno);
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error=>{
        console.log(error);
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
