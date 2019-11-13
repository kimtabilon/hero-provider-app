import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
var VaultPage = /** @class */ (function () {
    function VaultPage(http, modalController, env) {
        this.http = http;
        this.modalController = modalController;
        this.env = env;
        this.jobs = [];
        this.vault = [];
    }
    VaultPage.prototype.ngOnInit = function () {
    };
    VaultPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.http.post(this.env.HERO_API + 'jobs/completed', { id: this.hero.id })
            .subscribe(function (data) {
            var response = data;
            if (response !== null) {
                _this.jobs = response.data;
                _this.vault.overall_total = 0;
                for (var _i = 0, _a = _this.jobs; _i < _a.length; _i++) {
                    var _job = _a[_i];
                    console.log(_job);
                    console.log();
                    _this.vault.overall_total += parseInt(_job.amount);
                }
                _this.vault.jobs = [];
            }
        }, function (error) { console.log(error); });
    };
    VaultPage.prototype.segmentChanged = function (ev) {
        switch (ev.detail.value) {
            case "profile":
                this.loading.present();
                this.loading.dismiss();
                break;
            case "settings":
                this.loading.present();
                this.loading.dismiss();
                break;
            case "logs":
                this.loading.present();
                this.loading.dismiss();
                break;
            default:
                // code...
                break;
        }
    };
    VaultPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VaultPage.prototype, "hero", void 0);
    VaultPage = __decorate([
        Component({
            selector: 'app-vault',
            templateUrl: './vault.page.html',
            styleUrls: ['./vault.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ModalController,
            EnvService])
    ], VaultPage);
    return VaultPage;
}());
export { VaultPage };
//# sourceMappingURL=vault.page.js.map