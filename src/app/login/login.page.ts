import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { GetService } from 'src/app/services/get.service';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';

import { FacebookPage } from '../facebook/facebook.page';
import { GooglePage } from '../google/google.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hero:any;
  account:any = {
    id: '',
    user_id: '',
    app_key: '',
    settings: {
      offline: false,
      auto_confirm: false,
      account_lock: true,
      preferred_location: [], 
      block_dates: []
    }
  };

  constructor(
    private http: HttpClient,
  	private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private storage: Storage,
    public getService: GetService,
    public loading: LoadingService,
    private env: EnvService,
    private appVersion: AppVersion,
    private market: Market,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/tabs/home');
      }
    });
  }

  async facebook() {
    const modal = await this.modalController.create({
      component: FacebookPage,
      componentProps: { 
        user: {}
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        let response:any = data;
    });

    return await modal.present();
  }

  async google() {
    const modal = await this.modalController.create({
      component: GooglePage,
      componentProps: { 
        user: {}
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        let response:any = data;
    });

    return await modal.present();
  }

  login(form: NgForm) {
    this.loading.present();
    if(form.value.email != '' && form.value.password != '') 
    {
      this.authService.login(form.value.email, form.value.password).subscribe(
        data => {
          // console.log(data);
          this.loading.dismiss();
          let response:any = data;
          this.storage.set('hero', response);

          this.authService.log(response.data.id, 'login', 'You have been successfully logged in!');

          this.account.user = response.data;

          this.http.post(this.env.HERO_API + 'account_settings/byUser', { user_id: this.account.user.id, app_key: this.env.APP_ID })
            .subscribe(data => { 
              // this.storage.set('hero', data);
              let response:any = data;
              this.account.settings = JSON.parse(response.data.settings);
              this.account.id = response.data.id;
              this.account.settings.offline = false;

              this.http.post(this.env.HERO_API + 'account_settings/save', { user_id: this.account.user.id, app_key: this.env.APP_ID, settings: JSON.stringify(this.account.settings) })
                .subscribe(data => { 
                  let response:any = data;
                  this.account.settings = JSON.parse(response.data.settings);
                  this.account.id = response.data.id;
                },error => { 
                  this.alertService.presentToast("Server not responding!");
                  console.log(error);
                  this.authService.http_error(error);
                },() => { 
              });  
              // console.log(this.account.settings);
            },error => { 
              this.account.settings.offline = false;
              let settings:any = JSON.stringify(this.account.settings);
              this.http.post(this.env.HERO_API + 'account_settings/save', { user_id: this.account.user.id, app_key: this.env.APP_ID, settings: settings })
                .subscribe(data => { 
                  let response:any = data;
                  this.account.settings = JSON.parse(response.data.settings);
                  this.account.id = response.data.id;
                },error => { 
                  this.alertService.presentToast("Server not responding!");
                  console.log(error);
                  this.authService.http_error(error);
                },() => { 
              });  
            },() => { 
              // this.alertService.presentToast("Settings saved."); 
          }); 
          // this.alertService.presentToast("Logged In");
        },
        error => {
          this.loading.dismiss();
          this.alertService.presentToast("Wrong Email/Password or Inactive account");
          // this.alertService.presentToast(error.message);
        },
        () => {
          this.navCtrl.navigateRoot('/tabs/home');
        }
      );
    } else {
      this.loading.dismiss();
      this.alertService.presentToast("Empty Email or Password");
    }
      
  }

}
