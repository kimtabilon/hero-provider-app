import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { VaultPage } from '../vault/vault.page';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

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
  notifications:any = [];
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
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
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
      
      /*Get My Jobs*/
      this.http.post(this.env.HERO_API + 'inboxes/byUser',{app_key: this.env.APP_ID, user_id: this.user.id})
        .subscribe(data => {
            let response:any = data;
            this.notifications = response.data;
            // console.log(this.notifications);
            this.title = 'My Inbox';
            this.loading.dismiss();
        },error => { 
            console.log(error); 
            this.title = 'My Inbox'; 
            this.loading.dismiss(); 
        });

    });
  }

  async tapNoti(noti) {
    let btns:any = [];

    if(noti.type == 'Available Job' || noti.type == 'For Confirmation'){
      btns.push({
        text: 'View Job',
        icon: 'arrow-dropright-circle',
        handler: () => {
          let route:any = '';
          switch (noti.type) {
            case "Available Job":
              route = '/tabs/jobview';
              break;

            case "For Confirmation":
              route = '/tabs/jobview';
              break;  

            default:
              this.loading.dismiss();
              break;
          }

          this.router.navigate([route],{
            queryParams: {
                job_id : noti.redirect_id,
                noti_id: noti.id
            },
          });
          this.loading.dismiss();
        }
      });
    }  

    btns.push({
      text: 'Delete Notification',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.loading.present();
        this.http.post(this.env.HERO_API + 'inboxes/hide',{id: noti.id})
        .subscribe(data => {
            let response:any = data;
            noti.seen = 'Yes';
            this.loading.dismiss();
        },error => { this.loading.dismiss(); });
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

    const actionSheet = await this.actionSheetController.create({ buttons: btns });
    await actionSheet.present();
      
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
