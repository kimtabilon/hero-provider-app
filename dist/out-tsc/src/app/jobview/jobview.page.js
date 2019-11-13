import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatPage } from '../chat/chat.page';
import { ReviewPage } from '../review/review.page';
var JobviewPage = /** @class */ (function () {
    function JobviewPage(menu, authService, navCtrl, storage, alertService, router, activatedRoute, loading, http, env, alertCtrl, modalController) {
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
        this.alertCtrl = alertCtrl;
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
        this.job = [];
        this.attributes = [];
        this.form = [];
        this.status = '';
        this.title = 'Please wait...';
        this.customer_info = [];
        this.formExist = false;
        this.hero = [];
        this.heroExist = false;
        this.noti_id = '';
        this.enableCancel = false;
        this.enableNoshow = false;
        this.enableReview = false;
        this.menu.enable(true);
    }
    JobviewPage.prototype.ngOnInit = function () {
    };
    JobviewPage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    JobviewPage.prototype.ionViewWillEnter = function () {
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
        });
        this.activatedRoute.queryParams.subscribe(function (res) {
            var job_id = res.job_id;
            _this.noti_id = res.noti_id;
            _this.http.post(_this.env.HERO_API + 'jobs/byID', { id: job_id })
                .subscribe(function (data) {
                var response = data;
                _this.job = response.data;
                _this.attributes = JSON.parse(_this.job.form_value);
                _this.customer_info = JSON.parse(_this.job.customer_info);
                _this.status = _this.job.status;
                if (_this.job.form !== null) {
                    _this.form = _this.job.form;
                    _this.formExist = true;
                }
                else {
                    _this.formExist = false;
                }
                if (_this.job.hero !== null) {
                    _this.hero = _this.job.hero;
                    _this.heroExist = true;
                }
                else {
                    _this.heroExist = false;
                }
                if (_this.job.status == 'For Confirmation') {
                    _this.title = 'Confirm Job';
                }
                else {
                    _this.title = 'Job Info';
                }
                if (_this.noti_id == undefined) {
                    _this.noti_id = _this.job.noti_id;
                }
                /*NOSHOW*/
                var curday = function (sp) {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //As January is 0.
                    var yyyy = today.getFullYear();
                    if (dd < 10)
                        dd = '0' + dd;
                    if (mm < 10)
                        mm = '0' + mm;
                    return (yyyy + sp + mm + sp + dd);
                };
                var now = new Date();
                // now.setMinutes(now.getMinutes() + 30); 
                var curtime = new Date(now);
                var schedtime = new Date(_this.job.schedule_date + ' ' + _this.job.schedule_time);
                schedtime.setMinutes(schedtime.getMinutes() + 30);
                var curdate = new Date(curday('-') + ' ' + '00:00');
                var scheddate = new Date(_this.job.schedule_date);
                if (curdate >= scheddate && curtime >= schedtime && _this.job.status == 'Pending') {
                    _this.enableNoshow = false;
                }
                else {
                    _this.enableNoshow = false;
                }
                if (_this.job.status == 'Cancelled' ||
                    _this.job.status == 'Completed' ||
                    _this.job.status == 'Waiting for Payment' ||
                    _this.job.status == 'Paid') {
                    _this.enableCancel = false;
                }
                else {
                    _this.enableCancel = true;
                }
                if (_this.job.status == 'Completed' ||
                    _this.job.status == 'Paid') {
                    _this.checkExistingReview();
                }
                // if(this.job.status == 'No Show : Client' || 
                //    this.job.status == 'No Show : Hero' || 
                //    this.job.status == 'Cancelled' || 
                //    this.job.status == 'Denied' || 
                //    this.job.status == 'Completed' ||
                //    this.job.status == 'Waiting for Payment' ||
                //    this.job.status == 'Paid'
                // ) {
                //   this.enableNoshow = false;
                // }
                _this.loading.dismiss();
            }, function (error) {
                console.log(error);
                _this.title = 'Back';
                // this.alertService.presentToast("Client removed this job.");
                _this.http.post(_this.env.HERO_API + 'inboxes/hide', { id: _this.noti_id })
                    .subscribe(function (data) {
                    var response = data;
                    _this.loading.dismiss();
                }, function (error) {
                    _this.loading.dismiss();
                    console.log(error);
                }, function () {
                    _this.loading.dismiss();
                    _this.navCtrl.navigateRoot('/tabs/job');
                });
                _this.loading.dismiss();
            });
        });
    };
    JobviewPage.prototype.checkExistingReview = function () {
        var _this = this;
        this.http.post(this.env.HERO_API + 'reviews/checkExisting', {
            job_id: this.job.id,
            hero_id: this.job.hero_id,
            from: 'client',
        })
            .subscribe(function (data) {
            _this.enableReview = false;
        }, function (error) {
            _this.enableReview = true;
        }, function () { });
    };
    JobviewPage.prototype.tapBack = function () {
        this.loading.present();
        this.router.navigate(['/tabs/job'], {
            queryParams: {},
        });
        this.loading.dismiss();
    };
    JobviewPage.prototype.tapConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm Job?',
                            message: 'If you wish to accept this job, tap continue.',
                            buttons: [
                                {
                                    text: 'Back',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.loading.present();
                                        /*Confirm Jobs*/
                                        _this.http.post(_this.env.HERO_API + 'jobs/confirm', { id: _this.job.id, noti_id: _this.noti_id })
                                            .subscribe(function (data) {
                                            _this.loading.dismiss();
                                        }, function (error) {
                                            _this.alertService.presentToast("Client removed this job.");
                                            _this.http.post(_this.env.HERO_API + 'inboxes/hide', { id: _this.noti_id })
                                                .subscribe(function (data) {
                                                var response = data;
                                                _this.loading.dismiss();
                                            }, function (error) {
                                                _this.loading.dismiss();
                                                console.log(error);
                                            }, function () {
                                                _this.loading.dismiss();
                                                _this.navCtrl.navigateRoot('/tabs/inbox');
                                            });
                                            _this.loading.dismiss();
                                            console.log(error);
                                        }, function () { _this.navCtrl.navigateRoot('/tabs/job'); });
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
    JobviewPage.prototype.tapStartJob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Start Job?',
                            message: 'Client will receive notification for this action.',
                            buttons: [
                                {
                                    text: 'Back',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.loading.present();
                                        /*Confirm Jobs*/
                                        _this.http.post(_this.env.HERO_API + 'jobs/start', { id: _this.job.id })
                                            .subscribe(function (data) {
                                            _this.loading.dismiss();
                                        }, function (error) {
                                            // this.alertService.presentToast("Client removed this job.");
                                            // this.http.post(this.env.HERO_API + 'inboxes/hide',{id: this.noti_id})
                                            // .subscribe(data => {
                                            //     let response:any = data;
                                            //     this.loading.dismiss();
                                            // },error => { 
                                            //   this.loading.dismiss(); 
                                            //   console.log(error);
                                            // },() => { 
                                            //   this.loading.dismiss();
                                            //   this.navCtrl.navigateRoot('/tabs/inbox'); 
                                            // });
                                            _this.loading.dismiss();
                                            console.log(error);
                                            _this.navCtrl.navigateRoot('/tabs/job');
                                        }, function () { _this.navCtrl.navigateRoot('/tabs/job'); });
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
    JobviewPage.prototype.tapDeny = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Cancel Job?',
                            message: 'By tapping continue, job will be cancelled.',
                            buttons: [
                                {
                                    text: 'Back',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.loading.present();
                                        /*Confirm Jobs*/
                                        _this.http.post(_this.env.HERO_API + 'jobs/deny', { id: _this.job.id, noti_id: _this.noti_id })
                                            .subscribe(function (data) {
                                            _this.loading.dismiss();
                                        }, function (error) {
                                            console.log(error);
                                            _this.alertService.presentToast("Server not responding!");
                                            _this.loading.dismiss();
                                        }, function () { _this.navCtrl.navigateRoot('/tabs/job'); });
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
    JobviewPage.prototype.tapDone = function () {
        var _this = this;
        this.loading.present();
        /*Confirm Jobs*/
        this.http.post(this.env.HERO_API + 'jobs/done', { id: this.job.id })
            .subscribe(function (data) {
        }, function (error) {
            _this.alertService.presentToast("Server not responding!");
            console.log(error);
        }, function () {
            _this.navCtrl.navigateRoot('/tabs/job');
        });
        this.loading.dismiss();
    };
    JobviewPage.prototype.tapRecievedCash = function () {
        var _this = this;
        this.loading.present();
        /*Confirm Jobs*/
        this.http.post(this.env.HERO_API + 'jobs/recievedCash', { id: this.job.id })
            .subscribe(function (data) {
        }, function (error) {
            _this.alertService.presentToast("Server not responding!");
            console.log(error);
        }, function () {
            _this.navCtrl.navigateRoot('/tabs/job');
        });
        this.loading.dismiss();
    };
    JobviewPage.prototype.tapNoShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Client not showing?',
                            message: 'By tapping continue, the job will tag as No Show.',
                            buttons: [
                                {
                                    text: 'Back',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.loading.present();
                                        _this.http.post(_this.env.HERO_API + 'jobs/noshowclient', { id: _this.job.id })
                                            .subscribe(function (data) {
                                        }, function (error) {
                                            _this.alertService.presentToast("Server no response");
                                            console.log(error);
                                        }, function () { _this.navCtrl.navigateRoot('/tabs/job'); });
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
    JobviewPage.prototype.chatHero = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ChatPage,
                            componentProps: {
                                job: this.job,
                                customer: this.customer_info
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
    JobviewPage.prototype.tapReview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ReviewPage,
                            componentProps: {
                                job: this.job
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
    JobviewPage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    JobviewPage = __decorate([
        Component({
            selector: 'app-jobview',
            templateUrl: './jobview.page.html',
            styleUrls: ['./jobview.page.scss'],
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
            AlertController,
            ModalController])
    ], JobviewPage);
    return JobviewPage;
}());
export { JobviewPage };
//# sourceMappingURL=jobview.page.js.map