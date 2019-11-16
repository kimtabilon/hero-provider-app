import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GetService } from 'src/app/services/get.service';
import { JobService } from 'src/app/services/job.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { ChatPage } from '../chat/chat.page';
import { DirectionPage } from '../direction/direction.page';
import { VaultPage } from '../vault/vault.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

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
  app:any = [];
  jobs:any = [];
  jobpage:any = true;
  myjobstitle:any = 'Please wait..';
  completedtitle:any = 'Completed';
  coorFound:any = false;
  coordinates:any;
  coorBtn:any = 'Refresh Coordinates';

  constructor(
    private http: HttpClient,
  	private menu: MenuController, 
  	private authService: AuthService,
  	private navCtrl: NavController,
    private storage: Storage,
    private alertService: AlertService,
    public loading: LoadingService,
    public getService: GetService,
    public jobService: JobService,
    public router : Router,
    private env: EnvService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private geolocation: Geolocation,
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

    this.jobpage = true;

    this.storage.get('hero').then((val) => {
      this.user = val.data;
      this.profile = val.data.profile;  
      if(this.profile.photo!==null) {
        this.photo = this.env.IMAGE_URL + 'uploads/' + this.profile.photo;
      } else {
        this.photo = this.env.DEFAULT_IMG;
      } 

      /*Get My Jobs*/
      this.http.post(this.env.HERO_API + 'hero/jobs',{id: this.user.id})
        .subscribe(data => {
            let response:any = data;
            if(response !== null) {
              this.jobs = response.data;
            } else {
              this.jobs = [];
            }
            this.myjobstitle = 'My Jobs';
            this.loading.dismiss();
        },error => { 
            this.myjobstitle = 'My Jobs'; 
            this.loading.dismiss();
        });


      this.storage.get('app').then((val) => {
        this.app = val.data;
      }); 
    });

    // this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log('current position...');
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude);
    //   this.coordinates = { lat: resp.coords.latitude, lng: resp.coords.longitude };

    //   this.storage.set('current_position', this.coordinates);
    //   this.coorFound = true;
    //   console.log('startup get coordinates...');
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  // getLocation() {
  //   this.coorBtn = 'Finding your location...'
  //   this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     console.log('current position...');
  //     console.log(resp.coords.latitude);
  //     console.log(resp.coords.longitude);
  //     this.coordinates = { lat: resp.coords.latitude, lng: resp.coords.longitude };

  //     this.storage.set('current_position', this.coordinates);
  //     this.coorFound = true;
  //     console.log('startup get coordinates...');
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //     this.coorBtn = 'Location not found. Try again';
  //   });
  //   this.coorBtn = 'Try Again';
  // }

  tapCompleted() {
    this.loading.present();
    this.jobpage = false;
    this.completedtitle = 'Please wait...';
    /*Get My Jobs*/
    this.http.post(this.env.HERO_API + 'jobs/completed',{id: this.user.id})
      .subscribe(data => {
          let response:any = data;
          if(response !== null) {
            this.jobs = response.data;
          } else {
            this.jobs = [];
          }
          this.completedtitle = 'Completed';
      },error => { this.completedtitle = 'Completed'; });
    this.loading.dismiss();  
  } 

  tapMyJobs() {
    this.loading.present();
    this.jobpage = true;
    this.myjobstitle = 'Please wait...';
    /*Get My Jobs*/
    this.http.post(this.env.HERO_API + 'hero/jobs',{id: this.user.id})
      .subscribe(data => {
          let response:any = data;
          if(response !== null) {
            this.jobs = response.data;
          } else {
            this.jobs = [];
          }
          this.myjobstitle = 'My Jobs';
      },error => { this.myjobstitle = 'My Jobs'; });
    this.loading.dismiss();
  }

  async presentActionSheet(job) {
    let actions:any = {
      buttons: [{
        text: 'View Details',
        icon: 'eye',
        handler: () => {
          this.loading.present();
          let route:any = '';
          switch (job.status) {
            case "For Quotation":
              route = '/tabs/quotation';
              break; 
            
            default:
              route = '/tabs/jobview';
              break;
          }

          this.router.navigate([route],{
            queryParams: {
                job_id : job.id
            },
          });
          this.loading.dismiss();
        }
      }, {
        text: 'Chat with Client',
        icon: 'chatbubbles',
        handler: () => {
          this.openChat(job);        }
      }, 
      {
        text: 'Get Direction',
        icon: 'pin',
        handler: () => {
          this.getDirection(job);        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    };
    const actionSheet = await this.actionSheetController.create(actions);
    await actionSheet.present();
  } 

  async openChat(job) {
    const modal = await this.modalController.create({
      component: ChatPage,
      componentProps: { 
        job: job,
        customer: JSON.parse(job.customer_info)
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        let response:any = data;
    });

    return await modal.present();
  }

  async getDirection(job) {
    // console.log(job);
    let hero_address:any = '';
    let address:any = this.user.profile.addresses[0];
    let customer_info = JSON.parse(job.customer_info);

    console.log(customer_info);

    // if(address.street) { hero_address += address.street + ', '; }
    if(address.barangay) { hero_address += address.barangay + ', '; }
    if(address.city) { hero_address += address.city + ', '; }
    if(address.province) { hero_address += address.province + ', '; }
    if(address.country) { hero_address += address.country + ' '; }

    const modal = await this.modalController.create({
      component: DirectionPage,
      componentProps: { 
        customer_address: customer_info.address,
        hero_address: hero_address
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        let response:any = data;
    });

    return await modal.present();
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
