import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  
  IMAGE_URL = 'http://www.mjsitechsolutions.com/heroimages/';  
  DEFAULT_IMG = '../../assets/img/blank-profile.png';  
  
  APP_ID = 'heroPROasdfr45fd';
  ONESIGNAL_APP_ID = 'a367acdc-a0a1-41cf-a58c-ada4a06ed671';
  FCM_SENDER_ID = '240609983489';


  /** LIVE ENVIRONMENT */
  ENVIRONMENT = 'live';
  API_URL = 'http://heroserviceprovider.herokuapp.com/api/';
  HERO_ADMIN = 'http://heroserviceprovider.herokuapp.com/';
  HERO_API = 'http://heroserviceprovider.herokuapp.com/api/';

  /** LOCAL ENVIRONMENT */
  /*ENVIRONMENT = 'local';
  API_URL = 'http://127.0.0.1:8000/api/';
  HERO_ADMIN = 'http://127.0.0.1:8000/';   
  HERO_API = 'http://127.0.0.1:8000/api/';  */

  /** TEST ENVIRONMENT */
  // ENVIRONMENT = 'test';
  // API_URL = 'http://herotestserver.herokuapp.com/api/';
  // HERO_ADMIN = 'http://herotestserver.herokuapp.com/';
  // HERO_API = 'http://herotestserver.herokuapp.com/api/';

  constructor() { }

  
}
