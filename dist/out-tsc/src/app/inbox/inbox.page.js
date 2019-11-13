import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
var InboxPage = /** @class */ (function () {
    function InboxPage(http, menu, authService, navCtrl, storage, alertService, loading, router, env, alertCtrl, actionSheetController) {
        this.http = http;
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.router = router;
        this.env = env;
        this.alertCtrl = alertCtrl;
        this.actionSheetController = actionSheetController;
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
        this.notifications = [];
        this.title = 'Please wait...';
        this.menu.enable(true);
    }
    InboxPage.prototype.ngOnInit = function () {
    };
    InboxPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    InboxPage.prototype.ionViewWillEnter = function () {
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
            /*Get My Jobs*/
            _this.http.post(_this.env.HERO_API + 'inboxes/byUser', { app_key: _this.env.APP_ID, user_id: _this.user.id })
                .subscribe(function (data) {
                var response = data;
                _this.notifications = response.data;
                // console.log(this.notifications);
                _this.title = 'My Inbox';
                _this.loading.dismiss();
            }, function (error) {
                console.log(error);
                _this.title = 'My Inbox';
                _this.loading.dismiss();
            });
        });
    };
    InboxPage.prototype.tapNoti = function (noti) {
        return __awaiter(this, void 0, void 0, function () {
            var btns, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        btns = [];
                        if (noti.type == 'Available Job' || noti.type == 'For Confirmation') {
                            btns.push({
                                text: 'View Job',
                                icon: 'arrow-dropright-circle',
                                handler: function () {
                                    var route = '';
                                    switch (noti.type) {
                                        case "Available Job":
                                            route = '/tabs/jobview';
                                            break;
                                        case "For Confirmation":
                                            route = '/tabs/jobview';
                                            break;
                                        default:
                                            _this.loading.dismiss();
                                            break;
                                    }
                                    _this.router.navigate([route], {
                                        queryParams: {
                                            job_id: noti.redirect_id,
                                            noti_id: noti.id
                                        },
                                    });
                                    _this.loading.dismiss();
                                }
                            });
                        }
                        btns.push({
                            text: 'Delete Notification',
                            role: 'destructive',
                            icon: 'trash',
                            handler: function () {
                                _this.loading.present();
                                _this.http.post(_this.env.HERO_API + 'inboxes/hide', { id: noti.id })
                                    .subscribe(function (data) {
                                    var response = data;
                                    noti.seen = 'Yes';
                                    _this.loading.dismiss();
                                }, function (error) { _this.loading.dismiss(); });
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
                        return [4 /*yield*/, this.actionSheetController.create({ buttons: btns })];
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
    InboxPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    InboxPage = __decorate([
        Component({
            selector: 'app-inbox',
            templateUrl: './inbox.page.html',
            styleUrls: ['./inbox.page.scss'],
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
            AlertController,
            ActionSheetController])
    ], InboxPage);
    return InboxPage;
}());
export { InboxPage };
//# sourceMappingURL=inbox.page.js.map