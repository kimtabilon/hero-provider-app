import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
declare var google;

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})

export class DirectionPage implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  @Input() customer_address:any;
  @Input() hero_address:any;

  map:any;
  marker:any;
  coorFound:any = false;

  constructor(
    public modalController: ModalController,
    private geolocation: Geolocation,
    private storage: Storage,
   ) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {

    let options:any = {
        enableHighAccuracy: true, timeout: 60000, maximumAge: 0
    };
    // this.coorFound = true;

    // this.geolocation.getCurrentPosition(options).then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   let coor:any = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      
    //   this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
    //     zoom: 16,
    //     center: coor
    //   });


    //   this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
      
    //   this.directionsService.route({
    //     origin: new google.maps.LatLng(10.3235584, 123.91956479999999),
    //     destination: new google.maps.LatLng(10.3217105, 123.9186698),
    //     travelMode: 'DRIVING'
    //   }, (response, status) => {
    //     if (status === 'OK') {
    //       console.log(response);
    //       this.directionsDisplay.setDirections(response);
    //     } else {
    //       window.alert('Directions request failed due to ' + status);
    //     }
    //   });


    //   // this.marker = new google.maps.Marker({position: coor, map: this.map});
    //   // this.directionsDisplay.setMap(this.map);
      
    //   this.coorFound = true;

    //   let watch = this.geolocation.watchPosition();
    //   watch.subscribe((data) => {
    //     // data can be a set of coordinates, or an error (if an error occurred).
    //     // data.coords.latitude
    //     // data.coords.longitude
    //     console.log('watch position...');
    //     console.log(data.coords.latitude);
    //     console.log(data.coords.longitude);
    //     let coor:any = {lat: data.coords.latitude, lng: data.coords.longitude};

    //     // const marker = new google.maps.Marker({position: coor, map: this.map});
    //     // const marker = new google.maps.Marker({position: {lat: 10.3217105, lng: 123.9186698}, map: this.map});

    //     // this.marker.setPosition(new google.maps.LatLng(
    //     //       data.coords.latitude,
    //     //       data.coords.longitude)
    //     // );


    //   });

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    // this.storage.get('current_position').then((coor) => {
    //   console.log('coordinates from storage > ');
    //   console.log(coor);
    //   this.map = new google.maps.Map(this.mapNa  tiveElement.nativeElement, {
    //     zoom: 15,
    //     center: coor
    //   });
    //   const marker = new google.maps.Marker(coor);
    //   this.directionsDisplay.setMap(this.map);
    // });

    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: {lat: 10.3235584, lng: 123.91956479999999}
    });
    this.directionsDisplay.setMap(map);
    
    


    this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    this.directionsService.route({
      origin: this.customer_address,
      destination: this.hero_address,
      // origin: new google.maps.LatLng(10.3235584, 123.91956479999999),
      // destination: new google.maps.LatLng(10.3217105, 123.9186698),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      input: {}
    });
  }
}
