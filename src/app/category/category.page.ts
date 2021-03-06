import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { VaultPage } from '../vault/vault.page';

@Component({
  selector: 'app-home',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  user:any = {
    email: '',
    password: '',
    status: ''
  };  
  profile:any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    photo: ''
  };  
  photo:any = '';
  categories:any = [];
  app:any = [];
  title:any = 'Please wait...';

  constructor(
    private http: HttpClient,
  	private menu: MenuController, 
  	private authService: AuthService,
  	private navCtrl: NavController,
    private storage: Storage,
    private alertService: AlertService,
    public loading: LoadingService,
    public router : Router,
    private env: EnvService,
    public modalController: ModalController,
  ) { 
  	this.menu.enable(true);	
  }

  ngOnInit() {
    
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.loading.present();

    this.storage.get('hero').then((val) => {
      this.user = val.data;
      this.profile = val.data.profile;  
      if(this.profile.photo!==null) {
        this.photo = this.env.IMAGE_URL + 'uploads/' + this.profile.photo;
      } else {
        this.photo = this.env.DEFAULT_IMG;
      }
    });

  	this.storage.get('app').then((val) => {
  		this.app = val.data;
  	}); 

    /*Get All Services*/
  	this.http.post(this.env.HERO_API + 'categories/onlyservice',{key: this.env.APP_ID})
  	  .subscribe(data => {
  	      let response:any = data;
  	      this.categories = response.data;
          this.title = 'Add Service'; 
          this.loading.dismiss();
  	  },error => { 
        console.log(error);
        this.loading.dismiss();
        this.title = 'Add Service'; 
      }); 
     
    
  }

  tapCategory(category) {
    this.loading.present();
    if(category.services.length) {
      this.router.navigate(['/tabs/service'],{
        queryParams: {
            category_id : category.id
        },
      });
    } else {
      this.alertService.presentToast("No Service Available");
    }
    this.loading.dismiss();
      
  }

  tapBack() {
    this.loading.present();
    this.router.navigate(['/tabs/home'],{
      queryParams: {},
    });
    this.loading.dismiss();
  }

  async openVault() {
    const modal = await this.modalController.create({
      component: VaultPage,
      componentProps: { 
        hero: this.user
      }
    });

    modal.onDidDismiss()
      .then((data) => {
      }
    );

    return await modal.present();
  }

  logout() {
    this.loading.present();
    this.authService.logout();
    this.alertService.presentToast('Successfully logout');  
    this.navCtrl.navigateRoot('/login');  
    this.loading.dismiss();
  }

}
