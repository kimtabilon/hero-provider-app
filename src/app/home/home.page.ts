import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InitService } from '../services/init.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { InclusionPage } from '../inclusion/inclusion.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

  heroOption:any = {};

  photo:any = '';
  categories:any = [];
  app:any = [];
  myOptions:any = [];
  title:any = 'Please wait...';

  constructor(
    private http: HttpClient,
  	private menu: MenuController, 
  	private authService: AuthService,
    private initService: InitService,
  	private navCtrl: NavController,
    private storage: Storage,
    private alertService: AlertService,
    public loading: LoadingService,
    public router : Router,
    private env: EnvService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) { 
  	this.menu.enable(true);	
  }

  ngOnInit() {
    
  }

  doRefresh(event) {
    this.http.post(this.env.HERO_API + 'hero/login',{email: this.user.email, password:  this.user.password})
    .subscribe(data => {
        let response:any = data;
        this.storage.set('hero', response);
        this.user = response.data;
        this.ionViewWillEnter();
    },error => { 
      this.logout();
      console.log(error); 
    });

    
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.loading.present();
    this.initService.checkNetwork();
    
    this.storage.get('hero').then((val) => {
      this.user = val.data;
      this.profile = val.data.profile;  

      if(this.profile.photo!==null) {
        this.photo = this.env.IMAGE_URL + 'uploads/' + this.profile.photo;
      } else {
        this.photo = this.env.DEFAULT_IMG;
      }
      
      /*Get My Services*/
      this.http.post(this.env.HERO_API + 'hero/options',{id: this.user.id})
        .subscribe(data => {
            let response:any = data;
            console.log(response);
            this.myOptions = response.data.options;
            this.loading.dismiss();
        },error => { 
          console.log(error);
          this.loading.dismiss(); 
          this.authService.http_error(error);
        });

      this.storage.get('app').then((val) => {
        this.app = val.data;
      }); 
      this.title = 'My Services';
    });

  }

  async tapOption(option, i) {
    let btns:any = [];

    if(option.pivot.status == 'Active' && option.enable_quote == "No") {
       btns.push({
        text: 'Open',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/tabs/form'],{
            queryParams: {
                option : JSON.stringify(option)
            },
          });
        }
      }); 
    }

    if(option.form.inclusions !== null) {
       btns.push({
        text: 'View Inclusions',
        icon: 'list-box',
        handler: () => {
          this.showInclusion(option);
        }
      }); 
    }

    btns.push({
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.confirmDelete(option, i);
      }
    });

    btns.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });  

    let opt:any = {
      header: option.name,
      buttons: btns
    };
    const actionSheet = await this.actionSheetController.create(opt);
      await actionSheet.present();
  }

  async confirmDelete(option, i) {

    const alert = await this.alertController.create({
        header: 'Remove '+option.name+'?',
        message: 'Continue if you want to delete this service.',
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
              this.myOptions.splice(i, 1);
              this.heroOption.id = option.pivot.id;
              this.http.post(this.env.HERO_API + 'hero_options/delete',this.heroOption)
              .subscribe(data => { 
              },error => { 
                this.alertService.presentToast("Server not responding!"); 
                console.log(error);
              },() => { 
               
              });
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
      }
    );

    return await modal.present();
  }

  logout() {
    this.loading.present();
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');  
    this.loading.dismiss();
  }

}
