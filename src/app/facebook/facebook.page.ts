import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.page.html',
  styleUrls: ['./facebook.page.scss'],
})
export class FacebookPage implements OnInit {

  constructor(
  	public modalController: ModalController,
    public alertController: AlertController,
    private env: EnvService,
    public loading: LoadingService,
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      input: {}
    });
  }

  reset(form: NgForm) {
    this.loading.present();

    if(form.value.name != '' && form.value.email != '') 
    { 
      console.log(form.value);	
      this.http.post(this.env.API_URL + 'hero/mail/resendactivation',{password: form.value.password, email: form.value.email})
	    .subscribe(data => {
	        let response:any = data;
          console.log(response);

	        this.loading.dismiss();
	        this.alertService.presentToast("Check your Email for New Activation Link");
	    },error => { 
	    	this.loading.dismiss();
	    	this.alertService.presentToast("Account not Found");
	    	console.log(error); 
	    });
    } else {
      this.loading.dismiss();
      this.alertService.presentToast("Required Email and Password");
    }
      
  }

}
