import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient } from '@angular/common/http';
import { InclusionPage } from '../inclusion/inclusion.page';
var OptionPage = /** @class */ (function () {
    function OptionPage(menu, authService, navCtrl, storage, alertService, loading, router, env, activatedRoute, http, alertController, modalController) {
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.router = router;
        this.env = env;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.alertController = alertController;
        this.modalController = modalController;
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
        this.heroOption = {
            id: '',
            hero_id: '',
            option_id: '',
            pay_per: '',
            status: 'Disable'
        };
        this.service = [];
        this.options = [];
        this.menu.enable(true);
    }
    OptionPage.prototype.ngOnInit = function () {
    };
    OptionPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    OptionPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.storage.get('hero').then(function (val) {
            _this.user = val.data;
            _this.profile = val.data.profile;
            _this.hero_id = _this.user.id;
            if (_this.profile.photo !== null) {
                _this.photo = _this.env.IMAGE_URL + 'uploads/' + _this.profile.photo;
            }
            else {
                _this.photo = _this.env.DEFAULT_IMG;
            }
        });
        this.activatedRoute.queryParams.subscribe(function (res) {
            _this.service_id = res.service_id;
            _this.category_id = res.category_id;
            _this.http.post(_this.env.HERO_API + 'services/byID', { app_key: _this.env.APP_ID, id: _this.service_id })
                .subscribe(function (data) {
                var response = data;
                _this.service = response.data;
                _this.options = _this.service.options;
                _this.title = _this.service.name;
                _this.payType = _this.service.pay_type;
            }, function (error) {
                console.log(error);
            });
        });
        this.loading.dismiss();
    };
    OptionPage.prototype.tapOption = function (option) {
        this.loading.present();
        this.heroOption.option_id = option.id;
        this.heroOption.hero_id = this.hero_id;
        if (option.form !== null) {
            if (option.form.inclusions !== null) {
                this.showInclusion(option);
            }
            else {
                if (option.enable_quote == 'Yes') {
                    this.alertSave(option);
                }
                else {
                    this.redirectToAmount(option);
                }
            }
        }
        else {
            this.alertService.presentToast("No Form Available");
        }
        this.loading.dismiss();
    };
    OptionPage.prototype.alertSave = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Save ' + option.name + ' Service?',
                            message: 'For the meantime, this service will be inactive. Admin will notify you once this service has been activated. Continue if you want to save this service.',
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.http.post(_this.env.HERO_API + 'hero_options/save', _this.heroOption)
                                            .subscribe(function (data) {
                                            _this.heroOption.pay_per = '';
                                        }, function (error) {
                                            console.log(error);
                                            _this.alertService.presentToast("Server not responding!");
                                        }, function () { _this.navCtrl.navigateRoot('/tabs/home'); });
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
    OptionPage.prototype.showInclusion = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: InclusionPage,
                            componentProps: {
                                form: option.form
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            if (option.enable_quote == 'Yes') {
                                _this.alertSave(option);
                            }
                            else {
                                _this.redirectToAmount(option);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OptionPage.prototype.redirectToAmount = function (option) {
        this.router.navigate(['/tabs/form'], {
            queryParams: {
                service_id: this.service_id,
                category_id: this.category_id,
                hero_id: this.hero_id,
                option: JSON.stringify(option)
            },
        });
    };
    OptionPage.prototype.tapBack = function () {
        this.loading.present();
        this.router.navigate(['/tabs/service'], {
            queryParams: {
                category_id: this.category_id
            },
        });
        this.loading.dismiss();
    };
    OptionPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    OptionPage = __decorate([
        Component({
            selector: 'app-option',
            templateUrl: './option.page.html',
            styleUrls: ['./option.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            AuthService,
            NavController,
            Storage,
            AlertService,
            LoadingService,
            Router,
            EnvService,
            ActivatedRoute,
            HttpClient,
            AlertController,
            ModalController])
    ], OptionPage);
    return OptionPage;
}());
export { OptionPage };
//# sourceMappingURL=option.page.js.map