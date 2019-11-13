import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InclusionPage } from '../inclusion/inclusion.page';
import { VaultPage } from '../vault/vault.page';
@Component({
  selector: 'app-option',
  templateUrl: './option.page.html',
  styleUrls: ['./option.page.scss'],
})
export class OptionPage implements OnInit {
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

  heroOption:any = {
    id: '',
    hero_id: '',
    option_id: '',
    pay_per: '',
    status: 'Disable'
  };

  photo:any;
  title:any;
  payType:any;
  service:any = [];
  options:any = [];

  category_id:any;
  service_id:any;
  hero_id:any;
  
  constructor(
  	private menu: MenuController, 
  	private authService: AuthService,
  	private navCtrl: NavController,
    private storage: Storage,
    private alertService: AlertService,
    public loading: LoadingService,
    public router : Router,
    private env: EnvService,
    public activatedRoute : ActivatedRoute,
    private http: HttpClient,
    public alertController: AlertController,
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
      this.hero_id = this.user.id;

      if(this.profile.photo!==null) {
        this.photo = this.env.IMAGE_URL + 'uploads/' + this.profile.photo;
      } else {
        this.photo = this.env.DEFAULT_IMG;
      }
    });

    this.activatedRoute.queryParams.subscribe((res)=>{

        this.service_id = res.service_id;
        this.category_id = res.category_id;

        this.http.post(this.env.HERO_API + 'services/byID',{app_key: this.env.APP_ID, id: this.service_id })
          .subscribe(data => {
            let response:any = data;
            this.service = response.data;
            this.options = this.service.options;
            this.title = this.service.name;
            this.payType = this.service.pay_type;
          },error => { console.log(error);  
        });
    });

    this.loading.dismiss();

  }

  tapOption(option) {
    this.loading.present();
    this.heroOption.option_id = option.id;
    this.heroOption.hero_id = this.hero_id;
    if(option.form !== null) {
      if(option.form.inclusions !== null) {
        this.showInclusion(option);
      } else {
        if(option.enable_quote == 'Yes') {
          this.alertSave(option);
        } else {
          this.redirectToAmount(option);
        }
      }  
    } else {
      this.alertService.presentToast("No Form Available");
    }  
    this.loading.dismiss(); 
  }

  async alertSave(option) {
    const alert = await this.alertController.create({
      header: 'Save '+option.name+' Service?',
      message: 'For the meantime, this service will be inactive. Admin will notify you once this service has been activated. Continue if you want to save this service.',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continue',
          handler: () => {
            
              this.http.post(this.env.HERO_API + 'hero_options/save',this.heroOption)
              .subscribe(data => { 
                this.heroOption.pay_per = '';
              },error => { 
                console.log(error);
                this.alertService.presentToast("Server not responding!"); 
              },() => { this.navCtrl.navigateRoot('/tabs/home'); });
            
          }
        }
      ]
    });

    await alert.present();
  }

  async showInclusion(option) {
    const modal = await this.modalController.create({
      component: InclusionPage,
      componentProps: { 
        form: option.form
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if(option.enable_quote == 'Yes') {
          this.alertSave(option);
        } else {
          this.redirectToAmount(option);
        }
      }
    );

    return await modal.present();
  }

  redirectToAmount(option) {
    this.router.navigate(['/tabs/form'],{
      queryParams: {
          service_id : this.service_id,
          category_id : this.category_id,
          hero_id : this.hero_id,
          option : JSON.stringify(option)
      },
    });
  }

  tapBack() {
    this.loading.present();
    this.router.navigate(['/tabs/service'],{
      queryParams: {
          category_id : this.category_id
      },
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
