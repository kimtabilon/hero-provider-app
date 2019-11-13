import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GetService } from 'src/app/services/get.service';
import { JobService } from 'src/app/services/job.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { ChatPage } from '../chat/chat.page';
import { DirectionPage } from '../direction/direction.page';
var JobPage = /** @class */ (function () {
    function JobPage(http, menu, authService, navCtrl, storage, alertService, loading, getService, jobService, router, env, actionSheetController, modalController) {
        this.http = http;
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.getService = getService;
        this.jobService = jobService;
        this.router = router;
        this.env = env;
        this.actionSheetController = actionSheetController;
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
        this.photo = '';
        this.app = [];
        this.jobs = [];
        this.jobpage = true;
        this.myjobstitle = 'Please wait..';
        this.completedtitle = 'Completed';
        this.menu.enable(true);
    }
    JobPage.prototype.ngOnInit = function () {
    };
    JobPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    JobPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.jobpage = true;
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
            _this.http.post(_this.env.HERO_API + 'hero/jobs', { id: _this.user.id })
                .subscribe(function (data) {
                var response = data;
                if (response !== null) {
                    _this.jobs = response.data;
                }
                else {
                    _this.jobs = [];
                }
                _this.myjobstitle = 'My Jobs';
                _this.loading.dismiss();
            }, function (error) {
                _this.myjobstitle = 'My Jobs';
                _this.loading.dismiss();
            });
            _this.storage.get('app').then(function (val) {
                _this.app = val.data;
            });
        });
    };
    JobPage.prototype.tapCompleted = function () {
        var _this = this;
        this.loading.present();
        this.jobpage = false;
        this.completedtitle = 'Please wait...';
        /*Get My Jobs*/
        this.http.post(this.env.HERO_API + 'jobs/completed', { id: this.user.id })
            .subscribe(function (data) {
            var response = data;
            if (response !== null) {
                _this.jobs = response.data;
            }
            else {
                _this.jobs = [];
            }
            _this.completedtitle = 'Completed';
        }, function (error) { _this.completedtitle = 'Completed'; });
        this.loading.dismiss();
    };
    JobPage.prototype.tapMyJobs = function () {
        var _this = this;
        this.loading.present();
        this.jobpage = true;
        this.myjobstitle = 'Please wait...';
        /*Get My Jobs*/
        this.http.post(this.env.HERO_API + 'hero/jobs', { id: this.user.id })
            .subscribe(function (data) {
            var response = data;
            if (response !== null) {
                _this.jobs = response.data;
            }
            else {
                _this.jobs = [];
            }
            _this.myjobstitle = 'My Jobs';
        }, function (error) { _this.myjobstitle = 'My Jobs'; });
        this.loading.dismiss();
    };
    JobPage.prototype.presentActionSheet = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            var actions, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actions = {
                            buttons: [{
                                    text: 'View Details',
                                    icon: 'eye',
                                    handler: function () {
                                        _this.loading.present();
                                        var route = '';
                                        switch (job.status) {
                                            case "For Quotation":
                                                route = '/tabs/quotation';
                                                break;
                                            default:
                                                route = '/tabs/jobview';
                                                break;
                                        }
                                        _this.router.navigate([route], {
                                            queryParams: {
                                                job_id: job.id
                                            },
                                        });
                                        _this.loading.dismiss();
                                    }
                                }, {
                                    text: 'Chat with Client',
                                    icon: 'chatbubbles',
                                    handler: function () {
                                        _this.openChat(job);
                                    }
                                },
                                {
                                    text: 'Get Direction',
                                    icon: 'pin',
                                    handler: function () {
                                        _this.getDirection(job);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        };
                        return [4 /*yield*/, this.actionSheetController.create(actions)];
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
    JobPage.prototype.openChat = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ChatPage,
                            componentProps: {
                                job: job,
                                customer: JSON.parse(job.customer_info)
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            var response = data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobPage.prototype.getDirection = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            var hero_address, address, customer_info, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hero_address = '';
                        address = this.user.profile.addresses[0];
                        customer_info = JSON.parse(job.customer_info);
                        console.log(customer_info);
                        // if(address.street) { hero_address += address.street + ', '; }
                        if (address.barangay) {
                            hero_address += address.barangay + ', ';
                        }
                        if (address.city) {
                            hero_address += address.city + ', ';
                        }
                        if (address.province) {
                            hero_address += address.province + ', ';
                        }
                        if (address.country) {
                            hero_address += address.country + ' ';
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: DirectionPage,
                                componentProps: {
                                    customer_address: customer_info.address,
                                    hero_address: hero_address
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            var response = data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    JobPage = __decorate([
        Component({
            selector: 'app-job',
            templateUrl: './job.page.html',
            styleUrls: ['./job.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            MenuController,
            AuthService,
            NavController,
            Storage,
            AlertService,
            LoadingService,
            GetService,
            JobService,
            Router,
            EnvService,
            ActionSheetController,
            ModalController])
    ], JobPage);
    return JobPage;
}());
export { JobPage };
//# sourceMappingURL=job.page.js.map