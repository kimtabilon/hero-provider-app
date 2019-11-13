import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient } from '@angular/common/http';
var ServicePage = /** @class */ (function () {
    function ServicePage(menu, authService, navCtrl, storage, alertService, loading, router, env, activatedRoute, http) {
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
        this.services = [];
        this.title = 'Please wait...';
        this.menu.enable(true);
    }
    ServicePage.prototype.ngOnInit = function () {
    };
    ServicePage.prototype.doRefresh = function (event) {
        this.ionViewWillEnter();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    ServicePage.prototype.ionViewWillEnter = function () {
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
            var category_id = res.category_id;
            _this.http.post(_this.env.HERO_API + 'categories/byID', { app_key: _this.env.APP_ID, id: category_id })
                .subscribe(function (data) {
                var response = data;
                if (response !== null) {
                    var category = response.data;
                    _this.services = category.services;
                    _this.title = category.name;
                    _this.category_id = category.id;
                }
            }, function (error) {
                console.log(error);
            });
        });
        this.loading.dismiss();
    };
    ServicePage.prototype.tapService = function (service) {
        // console.log(this.services);
        this.loading.present();
        // this.router.navigate(['/tabs/form'],{
        //   queryParams: {
        //       service : JSON.stringify(service)
        //   },
        // });
        if (service.options.length) {
            this.router.navigate(['/tabs/option'], {
                queryParams: {
                    service_id: service.id,
                    category_id: this.category_id
                },
            });
        }
        this.loading.dismiss();
    };
    ServicePage.prototype.tapBack = function () {
        // console.log(service);
        this.loading.present();
        this.router.navigate(['/tabs/category'], {
            queryParams: {},
        });
        this.loading.dismiss();
    };
    ServicePage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    ServicePage = __decorate([
        Component({
            selector: 'app-service',
            templateUrl: './service.page.html',
            styleUrls: ['./service.page.scss'],
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
            HttpClient])
    ], ServicePage);
    return ServicePage;
}());
export { ServicePage };
//# sourceMappingURL=service.page.js.map