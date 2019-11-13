import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { GetService } from 'src/app/services/get.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
var LoginPage = /** @class */ (function () {
    function LoginPage(http, modalController, authService, navCtrl, alertService, storage, getService, loading, env, appVersion, market, alertController) {
        this.http = http;
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.storage = storage;
        this.getService = getService;
        this.loading = loading;
        this.env = env;
        this.appVersion = appVersion;
        this.market = market;
        this.alertController = alertController;
        this.account = {
            id: '',
            user_id: '',
            app_key: '',
            settings: {
                offline: false,
                auto_confirm: false,
                account_lock: true,
                preferred_location: [],
                block_dates: []
            }
        };
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.authService.getToken().then(function () {
            if (_this.authService.isLoggedIn) {
                _this.navCtrl.navigateRoot('/tabs/home');
            }
        });
    };
    LoginPage.prototype.login = function (form) {
        var _this = this;
        this.loading.present();
        if (form.value.email != '' && form.value.password != '') {
            this.authService.login(form.value.email, form.value.password).subscribe(function (data) {
                // console.log(data);
                _this.loading.dismiss();
                var response = data;
                _this.storage.set('hero', response);
                _this.authService.log(response.data.id, 'login', 'You have been successfully logged in!');
                _this.account.user = response.data;
                _this.http.post(_this.env.HERO_API + 'account_settings/byUser', { user_id: _this.account.user.id, app_key: _this.env.APP_ID })
                    .subscribe(function (data) {
                    // this.storage.set('hero', data);
                    var response = data;
                    _this.account.settings = JSON.parse(response.data.settings);
                    _this.account.id = response.data.id;
                    _this.account.settings.offline = false;
                    _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: JSON.stringify(_this.account.settings) })
                        .subscribe(function (data) {
                        var response = data;
                        _this.account.settings = JSON.parse(response.data.settings);
                        _this.account.id = response.data.id;
                    }, function (error) {
                        _this.alertService.presentToast("Server not responding!");
                        console.log(error);
                        _this.authService.http_error(error);
                    }, function () {
                    });
                    // console.log(this.account.settings);
                }, function (error) {
                    _this.account.settings.offline = false;
                    var settings = JSON.stringify(_this.account.settings);
                    _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: settings })
                        .subscribe(function (data) {
                        var response = data;
                        _this.account.settings = JSON.parse(response.data.settings);
                        _this.account.id = response.data.id;
                    }, function (error) {
                        _this.alertService.presentToast("Server not responding!");
                        console.log(error);
                        _this.authService.http_error(error);
                    }, function () {
                    });
                }, function () {
                    // this.alertService.presentToast("Settings saved."); 
                });
                // this.alertService.presentToast("Logged In");
            }, function (error) {
                _this.loading.dismiss();
                _this.alertService.presentToast("Wrong Email/Password or Inactive account");
                // this.alertService.presentToast(error.message);
            }, function () {
                _this.navCtrl.navigateRoot('/tabs/home');
            });
        }
        else {
            this.loading.dismiss();
            this.alertService.presentToast("Empty Email or Password");
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ModalController,
            AuthService,
            NavController,
            AlertService,
            Storage,
            GetService,
            LoadingService,
            EnvService,
            AppVersion,
            Market,
            AlertController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map