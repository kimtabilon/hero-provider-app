import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
var FormPage = /** @class */ (function () {
    function FormPage(menu, authService, navCtrl, storage, alertService, router, activatedRoute, loading, http, env, alertController) {
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loading = loading;
        this.http = http;
        this.env = env;
        this.alertController = alertController;
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
        this.option = [];
        this.optionExist = false;
        this.pay_type = '';
        this.heroOption = {
            id: '',
            hero_id: '',
            option_id: '',
            pay_per: '',
            status: 'Disable'
        };
        this.menu.enable(true);
    }
    FormPage.prototype.ngOnInit = function () {
    };
    FormPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    FormPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.storage.get('hero').then(function (val) {
            _this.user = val.data;
            _this.profile = val.data.profile;
            _this.heroOption.hero_id = _this.user.id;
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
            _this.option = JSON.parse(res.option);
            _this.heroOption.option_id = _this.option.id;
            _this.pay_type = _this.option.pay_type;
            _this.title = _this.option.name;
            if (_this.option.pivot) {
                _this.heroOption.pay_per = _this.option.pivot.pay_per;
                _this.heroOption.id = _this.option.pivot.id;
                _this.optionExist = true;
            }
            else {
                _this.heroOption.id = '';
                _this.heroOption.pay_per = '';
                _this.optionExist = false;
            }
        });
        this.loading.dismiss();
    };
    FormPage.prototype.tapBack = function () {
        this.loading.present();
        if (this.service_id != null) {
            this.router.navigate(['/tabs/option'], {
                queryParams: {
                    service_id: this.service_id,
                    category_id: this.category_id,
                },
            });
        }
        else {
            this.router.navigate(['/tabs/home'], {
                queryParams: {},
            });
        }
        this.loading.dismiss();
    };
    FormPage.prototype.tapNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.heroOption.pay_per >= 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Save ' + this.option.name + '?',
                                message: 'For the meantime, service will be inactive. Admin will notify you when its active. Continue if you want to save this service.',
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
                                                _this.authService.log(_this.user.id, 'new_service', 'New Service Added');
                                            }, function (error) {
                                                console.log(error);
                                                _this.alertService.presentToast("Server not responding!");
                                            }, function () { _this.navCtrl.navigateRoot('/tabs/home'); });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.alertService.presentToast("Minimun per hour is 200");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FormPage.prototype.tapRemove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Remove ' + this.option.name + '?',
                            message: 'Continue if you want to delete this service.',
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
                                        _this.http.post(_this.env.HERO_API + 'hero_options/delete', _this.heroOption)
                                            .subscribe(function (data) {
                                            _this.heroOption.pay_per = '';
                                        }, function (error) {
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
    FormPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    FormPage = __decorate([
        Component({
            selector: 'app-form',
            templateUrl: './form.page.html',
            styleUrls: ['./form.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            AuthService,
            NavController,
            Storage,
            AlertService,
            Router,
            ActivatedRoute,
            LoadingService,
            HttpClient,
            EnvService,
            AlertController])
    ], FormPage);
    return FormPage;
}());
export { FormPage };
//# sourceMappingURL=form.page.js.map