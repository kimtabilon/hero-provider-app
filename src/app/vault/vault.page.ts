import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
})
export class VaultPage implements OnInit {
	@Input() hero:any;
	jobs:any = [];
	vault:any = [];

	date_setup:any = [];
	
	filter_date:any;
	filter_week:any;
	filter_month:any;
	filter_year:any;

	viewReportBy:any = 'day';

  constructor(
  	private http: HttpClient,
  	public modalController: ModalController,
  	private env: EnvService,
  	public loading: LoadingService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

  	/*DATE IN FORM SETUP*/
  	let curday = function(sp){
      let today:any = new Date();
      let dd:any = today.getDate();
      let mm:any = today.getMonth()+1; //As January is 0.
      let yyyy:any = today.getFullYear();

      if(dd<10) dd='0'+dd;
      if(mm<10) mm='0'+mm;
      return (yyyy+sp+mm+sp+dd);
    };

    let lastYear = function(sp){
      let today:any = new Date();
      let dd:any = today.getDate();
      let mm:any = today.getMonth()+1; //As January is 0.
      let yyyy:any = today.getFullYear()-1;

      if(dd<10) dd='0'+dd;
      if(mm<10) mm='0'+mm;
      return (yyyy+sp+mm+sp+dd);
    };

    this.date_setup.current = curday('-');
    this.date_setup.last_year = lastYear('-');
    this.filter_date = curday('-');

    /*REQUEST COMPLETED JOBS*/
  	this.http.post(this.env.HERO_API + 'jobs/completed',{id: this.hero.id})
      .subscribe(data => {
          let response:any = data;

          if(response !== null) {
            this.jobs = response.data;
            
            this.vault.overall_total = 0;
            this.vault.earnings = 0;
            this.vault.count = 0;
            this.vault.hours = 0;
            this.vault.jobs = [];

            for(let _job of this.jobs) {
            	console.log(_job);
            	this.vault.overall_total += parseInt(_job.amount);

            	let _schedule_date = new Date(_job.schedule_date);
            	let _filter_date   = new Date(this.filter_date);
            	/*FILTER JOBS BY DATE*/
            	if(_schedule_date == _filter_date) {
            		this.vault.jobs.push(_job);
            		this.vault.earnings += parseInt(_job.amount);
            		this.vault.hours += parseInt(_job.hours);
            		this.vault.count++;
            	}
            }

            
          }
          
      },error => { console.log(error); });
  }

  segmentChanged(ev: any) {
    switch (ev.detail.value) {
      case "day":
        this.loading.present();
        this.viewReportBy = 'day';

        this.vault.earnings = 0;
		    this.vault.count = 0;
		    this.vault.hours = 0;
		    this.vault.jobs = [];

        this.loading.dismiss();
        break;

      case "week":
        this.loading.present();
        this.viewReportBy = 'week';

        this.filter_week = this.date_setup.current;

		    this.vault.earnings = 0;
		    this.vault.count = 0;
		    this.vault.hours = 0;
		    this.vault.jobs = [];

		    for(let _job of this.jobs) {
		    	let _schedule_date = new Date(_job.schedule_date);
		    	let _schedule_month = _schedule_date.getMonth()+1;

		    	let _filter_date   = new Date(this.filter_month);
		    	let _filter_month  = _filter_date.getMonth()+1;

		    	/*FILTER JOBS BY DATE*/
		    	if(_schedule_month === _filter_month) {
		    		this.vault.jobs.push(_job);
		    		this.vault.earnings += parseInt(_job.amount);
		    		this.vault.hours += parseInt(_job.hours);
		    		this.vault.count++;
		    	}
		    }

        this.loading.dismiss();
        break;

      case "month":
        this.loading.present();
        this.viewReportBy = 'month';

        this.filter_month = this.date_setup.current;

		    this.vault.earnings = 0;
		    this.vault.count = 0;
		    this.vault.hours = 0;
		    this.vault.jobs = [];

		    for(let _job of this.jobs) {
		    	let _schedule_date = new Date(_job.schedule_date);
		    	let _schedule_month = _schedule_date.getMonth()+1;

		    	let _filter_date   = new Date(this.filter_month);
		    	let _filter_month  = _filter_date.getMonth()+1;

		    	/*FILTER JOBS BY DATE*/
		    	if(_schedule_month === _filter_month) {
		    		this.vault.jobs.push(_job);
		    		this.vault.earnings += parseInt(_job.amount);
		    		this.vault.hours += parseInt(_job.hours);
		    		this.vault.count++;
		    	}
		    }

        this.loading.dismiss();
        break;

      case "year":
        this.loading.present();
        this.viewReportBy = 'year';

        this.filter_year = this.date_setup.current;

		    this.vault.earnings = 0;
		    this.vault.count = 0;
		    this.vault.hours = 0;
		    this.vault.jobs = [];

		    for(let _job of this.jobs) {
		    	let _schedule_date = new Date(_job.schedule_date);
		    	let _schedule_year = _schedule_date.getFullYear();

		    	let _filter_date   = new Date(this.filter_year);
		    	let _filter_year  = _filter_date.getFullYear();

		    	/*FILTER JOBS BY DATE*/
		    	if(_schedule_year === _filter_year) {
		    		this.vault.jobs.push(_job);
		    		this.vault.earnings += parseInt(_job.amount);
		    		this.vault.hours += parseInt(_job.hours);
		    		this.vault.count++;
		    	}
		    }
        this.loading.dismiss();
        break;  
      
      default:
        // code...
        break;
    }
  }

  changeFilterDate() {
    this.vault.earnings = 0;
    this.vault.count = 0;
    this.vault.hours = 0;
    this.vault.jobs = [];

    for(let _job of this.jobs) {
    	let _schedule_date = _job.schedule_date;
    	let _filter_date   = this.parseDate(this.filter_date,'/');
    	/*FILTER JOBS BY DATE*/
    	if(_schedule_date === _filter_date) {
    		this.vault.jobs.push(_job);
    		this.vault.earnings += parseInt(_job.amount);
    		this.vault.hours += parseInt(_job.hours);
    		this.vault.count++;
    	}
    }
  }

  changeFilterWeek() {
  	this.vault.earnings = 0;
    this.vault.count = 0;
    this.vault.hours = 0;
    this.vault.jobs = [];

    for(let _job of this.jobs) {
    	let _schedule_date = new Date(_job.schedule_date);
    	let _schedule_month = _schedule_date.getMonth()+1;

    	let _filter_date   = new Date(this.filter_month);
    	let _filter_month  = _filter_date.getMonth()+1;

    	/*FILTER JOBS BY DATE*/
    	if(_schedule_month === _filter_month) {
    		this.vault.jobs.push(_job);
    		this.vault.earnings += parseInt(_job.amount);
    		this.vault.hours += parseInt(_job.hours);
    		this.vault.count++;
    	}
    }
  }

  changeFilterMonth() {
  	this.vault.earnings = 0;
    this.vault.count = 0;
    this.vault.hours = 0;
    this.vault.jobs = [];

    for(let _job of this.jobs) {
    	let _schedule_date = new Date(_job.schedule_date);
    	let _schedule_month = _schedule_date.getMonth()+1;

    	let _filter_date   = new Date(this.filter_month);
    	let _filter_month  = _filter_date.getMonth()+1;

    	/*FILTER JOBS BY DATE*/
    	if(_schedule_month === _filter_month) {
    		this.vault.jobs.push(_job);
    		this.vault.earnings += parseInt(_job.amount);
    		this.vault.hours += parseInt(_job.hours);
    		this.vault.count++;
    	}
    }
  }

  changeFilterYear() {
  	this.vault.earnings = 0;
    this.vault.count = 0;
    this.vault.hours = 0;
    this.vault.jobs = [];

    for(let _job of this.jobs) {
    	let _schedule_date = new Date(_job.schedule_date);
    	let _schedule_year = _schedule_date.getFullYear();

    	let _filter_date   = new Date(this.filter_year);
    	let _filter_year  = _filter_date.getFullYear();

    	/*FILTER JOBS BY DATE*/
    	if(_schedule_year === _filter_year) {
    		this.vault.jobs.push(_job);
    		this.vault.earnings += parseInt(_job.amount);
    		this.vault.hours += parseInt(_job.hours);
    		this.vault.count++;
    	}
    }
  }

  parseDate(d,sp) {
  	let today:any = new Date(d);
    let dd:any = today.getDate();
    let mm:any = today.getMonth()+1; //As January is 0.
    let yyyy:any = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    // return (yyyy+sp+mm+sp+dd);
    return (mm+sp+dd+sp+yyyy);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      input: {}
    });
  }

}
