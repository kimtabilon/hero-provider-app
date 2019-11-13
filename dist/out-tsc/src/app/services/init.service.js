import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { NetworkPage } from '../network/network.page';
import { AuthService } from './auth.service';
var InitService = /** @class */ (function () {
    function InitService(http, storage, env, navCtrl, alertService, authService, appVersion, market, alertController, modalController) {
        this.http = http;
        this.storage = storage;
        this.env = env;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.authService = authService;
        this.appVersion = appVersion;
        this.market = market;
        this.alertController = alertController;
        this.modalController = modalController;
    }
    InitService.prototype.checkNetwork = function () {
        var _this = this;
        console.log('check network');
        this.http
            .post(this.env.HERO_API + 'check/server', {})
            .subscribe(function (data) {
            _this.checkAppUpdate();
        }, function (error) {
            _this.networkError(error);
        });
    };
    InitService.prototype.checkAppUpdate = function () {
        var _this = this;
        this.http.post(this.env.HERO_API + 'app/validate', { key: this.env.APP_ID }).subscribe(function (data) {
            var response = data;
            var app = response.data;
            _this.appVersion.getVersionNumber().then(function (value) {
                if (value != app.build) {
                    _this.alertUpdate(app.build);
                }
            }).catch(function (err) {
                // alert(err);
            });
            _this.storage.set('app', response);
        }, function (error) {
            _this.alertService.presentToast("App registration key is invalid. Or App was disabled in the server.");
            _this.authService.logout();
            _this.navCtrl.navigateRoot('/login');
            _this.authService.http_error(error);
        }, function () {
            // this.navCtrl.navigateRoot('/tabs/service');
        });
    };
    InitService.prototype.networkError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: NetworkPage,
                            componentProps: {
                                error: { error: error }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            _this.checkNetwork();
                            var response = data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InitService.prototype.alertUpdate = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'New Update Available',
                            message: 'Version ' + version,
                            buttons: [
                                {
                                    text: 'Update',
                                    handler: function () {
                                        _this.appVersion.getPackageName().then(function (value) {
                                            _this.market.open(value);
                                        }).catch(function (err) {
                                            // alert(err);
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            Storage,
            EnvService,
            NavController,
            AlertService,
            AuthService,
            AppVersion,
            Market,
            AlertController,
            ModalController])
    ], InitService);
    return InitService;
}());
export { InitService };
//# sourceMappingURL=init.service.js.map