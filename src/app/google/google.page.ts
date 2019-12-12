import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.page.html',
  styleUrls: ['./google.page.scss'],
})
export class GooglePage implements OnInit {

  constructor(
  	public modalController: ModalController,
    public alertController: AlertController,
    private env: EnvService,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      input: {}
    });
  }

}
