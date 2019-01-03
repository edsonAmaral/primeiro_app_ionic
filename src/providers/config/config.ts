import { Injectable } from '@angular/core';

let config_key_name = "config";
/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor() {

  }

  //Recupera dados do localstorage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);

    
  }

  //Grava dados do localstorage
  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    };

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (username) {
      config.username = username;
    }

    localStorage.setItem(config_key_name,JSON.stringify(config));
  }
}
