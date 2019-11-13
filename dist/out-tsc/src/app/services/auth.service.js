import { __decorate, __metadata } from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
var AuthService = /** @class */ (function () {
    function AuthService(http, storage, env, navCtrl, alertService, appVersion, market, alertController) {
        this.http = http;
        this.storage = storage;
        this.env = env;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.appVersion = appVersion;
        this.market = market;
        this.alertController = alertController;
        this.isLoggedIn = false;
        this.customerId = '';
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
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.env.API_URL + 'hero/login', { email: email, password: password, app_key: this.env.APP_ID }).pipe(tap(function (token) {
            _this.storage.set('token', token)
                .then(function () {
                // console.log('Token Stored');
            }, function (error) { return console.error('Error storing item', error); });
            _this.token = token;
            _this.isLoggedIn = true;
            return token;
        }));
        /*return this.http.get(this.env.API_URL + 'customers/1').subscribe((response) => {
            console.log(response);
        });*/
    };
    AuthService.prototype.register = function (first_name, middle_name, last_name, street, barangay, city, province, country, zip, birthmonth, birthday, birthyear, gender, phone_number, email, password, password_confirm) {
        return this.http.post(this.env.API_URL + 'hero/register', {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            street: street,
            barangay: barangay,
            city: city,
            province: province,
            country: country,
            zip: zip,
            birthmonth: birthmonth,
            birthday: birthday,
            birthyear: birthyear,
            gender: gender,
            phone_number: phone_number,
            email: email,
            password: password,
            password_confirm: password_confirm,
            app_key: this.env.APP_ID
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.storage.get('hero').then(function (val) {
            _this.account.user = val.data;
            _this.account.profile = val.data.profile;
            _this.account.user_id = _this.account.user.id;
            _this.account.app_key = _this.env.APP_ID;
            _this.log(_this.account.user.id, 'logout', 'You have been successfully logged out!');
            _this.clear_player_id(_this.account.user.id);
            _this.http.post(_this.env.HERO_API + 'account_settings/byUser', { user_id: _this.account.user.id, app_key: _this.env.APP_ID })
                .subscribe(function (data) {
                // this.storage.set('hero', data);
                var response = data;
                console.log(response);
                _this.account.settings = JSON.parse(response.data.settings);
                _this.account.settings.offline = true;
                _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: JSON.stringify(_this.account.settings) })
                    .subscribe(function (data) {
                    var response = data;
                    _this.account.settings = JSON.parse(response.data.settings);
                    _this.account.id = response.data.id;
                }, function (error) {
                    _this.alertService.presentToast("Server not responding!");
                    console.log(error);
                }, function () {
                });
                _this.account.id = response.data.id;
                // console.log(this.account.settings);
            }, function (error) {
                _this.account.settings.offline = true;
                var settings = JSON.stringify(_this.account.settings);
                _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: settings })
                    .subscribe(function (data) {
                    var response = data;
                    _this.account.settings = JSON.parse(response.data.settings);
                    _this.account.id = response.data.id;
                }, function (error) {
                    _this.alertService.presentToast("Server not responding!");
                    console.log(error);
                }, function () {
                });
            }, function () {
                // this.alertService.presentToast("Settings saved."); 
            });
        });
        this.storage.remove("token");
        this.storage.remove("hero");
        this.isLoggedIn = false;
        delete this.token;
        return '';
    };
    AuthService.prototype.user = function () {
        var headers = new HttpHeaders({
            'Authorization': this.token["token_type"] + " " + this.token["access_token"]
        });
        return this.http.get(this.env.API_URL + 'customers/1', { headers: headers })
            .pipe(tap(function (user) {
            return user;
        }));
    };
    AuthService.prototype.getToken = function () {
        var _this = this;
        return this.storage.get('token').then(function (data) {
            _this.token = data;
            if (_this.token != null) {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        }, function (error) {
            _this.token = null;
            _this.isLoggedIn = false;
        });
    };
    AuthService.prototype.log = function (user_id, type, label) {
        var _this = this;
        this.storage.get('app').then(function (val) {
            var app = val.data;
            _this.http.post(_this.env.HERO_API + 'logs/save', {
                app_id: app.id,
                user_id: user_id,
                type: type,
                label: label
            })
                .subscribe(function (data) {
                var response = data;
            }, function (error) {
                _this.alertService.presentToast("Server not responding!");
                console.log(error);
            }, function () {
            });
        });
    };
    AuthService.prototype.http_error = function (error) {
        if (error.error) {
            var err = error.error;
            var label = '';
            label = err.message + ' at line ' + err.line + ' in ' + err.file;
            this.log('0', 'system_error', label);
        }
    };
    AuthService.prototype.clear_player_id = function (user_id) {
        var _this = this;
        this.http.post(this.env.HERO_API + 'hero/clear/playerID', { user_id: user_id })
            .subscribe(function (data) {
            var response = data;
        }, function (error) {
            // this.alertService.presentToast("Server not responding!");
            _this.http_error(error);
        }, function () {
        });
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            Storage,
            EnvService,
            NavController,
            AlertService,
            AppVersion,
            Market,
            AlertController])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map