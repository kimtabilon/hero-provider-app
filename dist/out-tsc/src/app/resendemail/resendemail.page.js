import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
var ResendemailPage = /** @class */ (function () {
    function ResendemailPage(http, modalController, authService, navCtrl, alertService, storage, loading, env) {
        this.http = http;
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.storage = storage;
        this.loading = loading;
        this.env = env;
    }
    ResendemailPage.prototype.ngOnInit = function () {
    };
    ResendemailPage.prototype.reset = function (form) {
        var _this = this;
        this.loading.present();
        if (form.value.name != '' && form.value.email != '') {
            console.log(form.value);
            this.http.post(this.env.API_URL + 'hero/mail/resendactivation', { password: form.value.password, email: form.value.email })
                .subscribe(function (data) {
                var response = data;
                console.log(response);
                _this.loading.dismiss();
                _this.alertService.presentToast("Check your Email for New Activation Link");
            }, function (error) {
                _this.loading.dismiss();
                _this.alertService.presentToast("Account not Found");
                console.log(error);
            });
        }
        else {
            this.loading.dismiss();
            this.alertService.presentToast("Required Email and Password");
        }
    };
    ResendemailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.http.post(this.env.HERO_API + 'check/server', {}).subscribe(function (data) { }, function (error) { _this.alertService.presentToast("Server not found. Check your internet connection."); });
        this.http.post(this.env.API_URL + 'check/server', {}).subscribe(function (data) { }, function (error) { _this.alertService.presentToast("Server not found. Check your internet connection."); });
    };
    ResendemailPage = __decorate([
        Component({
            selector: 'app-resendemail',
            templateUrl: './resendemail.page.html',
            styleUrls: ['./resendemail.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ModalController,
            AuthService,
            NavController,
            AlertService,
            Storage,
            LoadingService,
            EnvService])
    ], ResendemailPage);
    return ResendemailPage;
}());
export { ResendemailPage };
//# sourceMappingURL=resendemail.page.js.map