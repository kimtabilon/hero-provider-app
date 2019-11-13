import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Platform, MenuController, NavController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InitService } from '../services/init.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { InclusionPage } from '../inclusion/inclusion.page';
import { VaultPage } from '../vault/vault.page';
import { OneSignal } from '@ionic-native/onesignal/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(platform, http, menu, authService, initService, navCtrl, storage, alertService, loading, router, env, actionSheetController, alertController, modalController, oneSignal) {
        this.platform = platform;
        this.http = http;
        this.menu = menu;
        this.authService = authService;
        this.initService = initService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.router = router;
        this.env = env;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.modalController = modalController;
        this.oneSignal = oneSignal;
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
        this.heroOption = {};
        this.photo = '';
        this.categories = [];
        this.app = [];
        this.myOptions = [];
        this.title = 'Please wait...';
        this.menu.enable(true);
    }
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.initService.checkNetwork();
        this.storage.get('hero').then(function (val) {
            _this.user = val.data;
            _this.profile = val.data.profile;
            if (_this.profile.photo !== null) {
                _this.photo = _this.env.IMAGE_URL + 'uploads/' + _this.profile.photo;
            }
            else {
                _this.photo = _this.env.DEFAULT_IMG;
            }
            /*Get My Services*/
            _this.http.post(_this.env.HERO_API + 'hero/options', { id: _this.user.id })
                .subscribe(function (data) {
                var response = data;
                console.log(response);
                _this.myOptions = response.data.options;
                _this.loading.dismiss();
            }, function (error) {
                console.log(error);
                _this.loading.dismiss();
                _this.authService.http_error(error);
            });
            _this.storage.get('app').then(function (val) {
                _this.app = val.data;
            });
            _this.title = 'My Services';
            if (_this.platform.is('cordova')) {
                _this.setupPush();
            }
            _this.checkUser(_this.user);
        });
    };
    HomePage.prototype.checkUser = function (user) {
        var _this = this;
        this.oneSignal.getIds().then(function (id) {
            // console.log(id);
            // this.alertService.presentToast(JSON.stringify(id.userId)); 
            _this.http.post(_this.env.HERO_API + 'hero/login', { email: user.email, password: user.password, player_id: id.userId })
                .subscribe(function (data) {
                var response = data;
                _this.storage.set('hero', response);
                _this.user = response.data;
                console.log(_this.user);
            }, function (error) {
                _this.logout();
                console.log(error);
            });
        });
    };
    HomePage.prototype.tapOption = function (option, i) {
        return __awaiter(this, void 0, void 0, function () {
            var btns, opt, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        btns = [];
                        if (option.pivot.status == 'Active' && option.enable_quote == "No") {
                            btns.push({
                                text: 'Open',
                                icon: 'eye',
                                handler: function () {
                                    _this.router.navigate(['/tabs/form'], {
                                        queryParams: {
                                            option: JSON.stringify(option)
                                        },
                                    });
                                }
                            });
                        }
                        if (option.form.inclusions !== null) {
                            btns.push({
                                text: 'View Inclusions',
                                icon: 'list-box',
                                handler: function () {
                                    _this.showInclusion(option);
                                }
                            });
                        }
                        btns.push({
                            text: 'Delete',
                            role: 'destructive',
                            icon: 'trash',
                            handler: function () {
                                _this.confirmDelete(option, i);
                            }
                        });
                        btns.push({
                            text: 'Cancel',
                            icon: 'close',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        });
                        opt = {
                            header: option.name,
                            buttons: btns
                        };
                        return [4 /*yield*/, this.actionSheetController.create(opt)];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.confirmDelete = function (option, i) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Remove ' + option.name + '?',
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
                                        _this.myOptions.splice(i, 1);
                                        _this.heroOption.id = option.pivot.id;
                                        _this.http.post(_this.env.HERO_API + 'hero_options/delete', _this.heroOption)
                                            .subscribe(function (data) {
                                        }, function (error) {
                                            _this.alertService.presentToast("Server not responding!");
                                            console.log(error);
                                        }, function () {
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
    HomePage.prototype.showInclusion = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
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
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.openVault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: VaultPage,
                            componentProps: {
                                hero: this.user
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.setupPush = function () {
        var _this = this;
        // I recommend to put these into your environment.ts
        this.oneSignal.startInit(this.env.ONESIGNAL_APP_ID, this.env.FCM_SENDER_ID);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
        // Notifcation was received in general
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            var msg = data.payload.body;
            var title = data.payload.title;
            var response = data.payload.additionalData;
            // this.alertService.presentToast(JSON.stringify(response)); 
            switch (response.route) {
                case "jobview":
                    _this.showAlert(title, msg, 'Open Job', '/tabs/jobview', { job_id: response.id });
                    break;
                default:
                    _this.showAlert(title, msg, 'Goto Inbox', '/tabs/inbox', {});
                    break;
            }
        });
        // Notification was really clicked/opened
        this.oneSignal.handleNotificationOpened().subscribe(function (data) {
            // Just a note that the data is a different place here!
            var response = data.notification.payload.additionalData;
            // this.alertService.presentToast(JSON.stringify(response)); 
            switch (response.route) {
                case "jobview":
                    _this.router.navigate(['/tabs/jobview'], {
                        queryParams: { job_id: response.id },
                    });
                    break;
                default:
                    _this.router.navigate(['/tabs/inbox'], {
                        queryParams: {},
                    });
                    break;
            }
            // this.showAlert('Notification opened', 'You already read this before', additionalData.task);
        });
        this.oneSignal.endInit();
    };
    HomePage.prototype.showAlert = function (title, msg, task, route, params) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: title,
                            subHeader: msg,
                            buttons: [
                                {
                                    text: "" + task,
                                    handler: function () {
                                        _this.router.navigate([route], {
                                            queryParams: params,
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            HttpClient,
            MenuController,
            AuthService,
            InitService,
            NavController,
            Storage,
            AlertService,
            LoadingService,
            Router,
            EnvService,
            ActionSheetController,
            AlertController,
            ModalController,
            OneSignal])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map