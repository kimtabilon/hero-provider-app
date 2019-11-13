import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
var DirectionPage = /** @class */ (function () {
    function DirectionPage(modalController) {
        this.modalController = modalController;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
    }
    DirectionPage.prototype.ngOnInit = function () {
    };
    DirectionPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        var that = this;
        this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        this.directionsService.route({
            origin: this.customer_address,
            destination: this.hero_address,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                console.log(response);
                _this.directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
        var map = new google.maps.Map(this.mapNativeElement.nativeElement, {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
        });
        this.directionsDisplay.setMap(map);
    };
    DirectionPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        ViewChild('mapElement'),
        __metadata("design:type", ElementRef)
    ], DirectionPage.prototype, "mapNativeElement", void 0);
    __decorate([
        ViewChild('directionsPanel'),
        __metadata("design:type", ElementRef)
    ], DirectionPage.prototype, "directionsPanel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DirectionPage.prototype, "customer_address", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DirectionPage.prototype, "hero_address", void 0);
    DirectionPage = __decorate([
        Component({
            selector: 'app-direction',
            templateUrl: './direction.page.html',
            styleUrls: ['./direction.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController])
    ], DirectionPage);
    return DirectionPage;
}());
export { DirectionPage };
//# sourceMappingURL=direction.page.js.map