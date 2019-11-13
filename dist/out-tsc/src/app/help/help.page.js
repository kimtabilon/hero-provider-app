import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
var HelpPage = /** @class */ (function () {
    function HelpPage(http, menu, authService, navCtrl, storage, alertService, loading, router, env, callNumber, emailComposer) {
        this.http = http;
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.router = router;
        this.env = env;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.user = {
            email: '',
            password: '',
            status: ''
        };
        this.profile = {
            first_name: '',
            middle_name: '',
            last_name: '',
            birthday: '',
            gender: '',
            photo: ''
        };
        this.photo = '';
        this.menu.enable(true);
    }
    HelpPage.prototype.ngOnInit = function () {
    };
    HelpPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    HelpPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.storage.get('hero').then(function (val) {
            _this.user = val.data;
            _this.profile = val.data.profile;
            if (_this.profile.photo !== null) {
                _this.photo = _this.env.IMAGE_URL + 'uploads/' + _this.profile.photo;
            }
            else {
                _this.photo = _this.env.DEFAULT_IMG;
            }
            _this.loading.dismiss();
        });
    };
    HelpPage.prototype.tapCall = function () {
        this.callNumber.callNumber("09979060885", true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    /*  help@heroapp.ph*/
    HelpPage.prototype.sendEmail = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'help@heroapp.ph',
            cc: 'heroapp.ph@gmail.com',
            bcc: ['john@doe.com', 'jane@doe.com'],
            attachments: [
            // 'file://img/logo.png',
            // 'res://icon.png',
            // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
            // 'file://README.pdf'
            ],
            subject: 'HERO CLIENT HELP',
            body: 'How are you? Nice greetings from Hero Client',
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    HelpPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    HelpPage = __decorate([
        Component({
            selector: 'app-help',
            templateUrl: './help.page.html',
            styleUrls: ['./help.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            MenuController,
            AuthService,
            NavController,
            Storage,
            AlertService,
            LoadingService,
            Router,
            EnvService,
            CallNumber,
            EmailComposer])
    ], HelpPage);
    return HelpPage;
}());
export { HelpPage };
//# sourceMappingURL=help.page.js.map