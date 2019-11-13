import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
var TabsPage = /** @class */ (function () {
    function TabsPage(http, authService, storage, alertService, loading, env) {
        this.http = http;
        this.authService = authService;
        this.storage = storage;
        this.alertService = alertService;
        this.loading = loading;
        this.env = env;
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
        this.count = 0;
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // this.loading.present();
        this.environment = this.env.ENVIRONMENT;
        this.storage.get('hero').then(function (val) {
            _this.user = val.data;
            _this.profile = val.data.profile;
            /*Get My Jobs*/
            _this.http.post(_this.env.HERO_API + 'inboxes/byUser', { app_key: _this.env.APP_ID, user_id: _this.user.id })
                .subscribe(function (data) {
                var response = data;
                _this.count = response.data.length;
            }, function (error) {
                console.log(error);
            });
        });
    };
    TabsPage.prototype.clearNoti = function () {
        this.count = 0;
    };
    TabsPage = __decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        __metadata("design:paramtypes", [HttpClient,
            AuthService,
            Storage,
            AlertService,
            LoadingService,
            EnvService])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map