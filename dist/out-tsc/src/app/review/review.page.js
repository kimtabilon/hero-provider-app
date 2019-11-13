import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
var ReviewPage = /** @class */ (function () {
    function ReviewPage(modalController, alertController, env, http, loading, alertService) {
        this.modalController = modalController;
        this.alertController = alertController;
        this.env = env;
        this.http = http;
        this.loading = loading;
        this.alertService = alertService;
        this.ratings = 1;
        this.reviews = '';
    }
    ReviewPage.prototype.ngOnInit = function () {
        console.log(this.job);
    };
    ReviewPage.prototype.writeReview = function (form) {
        var _this = this;
        if (form.value.ratings != '' && form.value.reviews != '') {
            this.http.post(this.env.HERO_API + 'reviews/create', {
                ratings: form.value.ratings,
                reviews: form.value.reviews,
                job_id: this.job.id,
                customer_id: this.job.customer_id,
                customer_info: this.job.customer_info,
                hero_id: this.job.hero_id,
                from: 'provider',
            })
                .subscribe(function (data) {
                var response = data;
                _this.loading.dismiss();
                _this.dismiss();
            }, function (error) {
                _this.loading.dismiss();
                _this.alertService.presentToast("Something went wrong. Try again later.");
                // this.dismiss();
                console.log(error);
            });
        }
        else {
            this.loading.dismiss();
            this.alertService.presentToast("Please input ratings and reviews");
        }
    };
    ReviewPage.prototype.parse = function (customer_info) {
        return JSON.parse(customer_info);
    };
    ReviewPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ReviewPage.prototype, "job", void 0);
    ReviewPage = __decorate([
        Component({
            selector: 'app-review',
            templateUrl: './review.page.html',
            styleUrls: ['./review.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController,
            EnvService,
            HttpClient,
            LoadingService,
            AlertService])
    ], ReviewPage);
    return ReviewPage;
}());
export { ReviewPage };
//# sourceMappingURL=review.page.js.map