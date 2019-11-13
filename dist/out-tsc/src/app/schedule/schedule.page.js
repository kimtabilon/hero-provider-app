import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
var SchedulePage = /** @class */ (function () {
    function SchedulePage(modalController, orderPipe) {
        this.modalController = modalController;
        this.orderPipe = orderPipe;
        this.current_date = '';
        this.next_year = '';
        this.new_block_date = '';
    }
    SchedulePage.prototype.ngOnInit = function () {
    };
    SchedulePage.prototype.addBlockDate = function () {
        this.block_dates.push(this.new_block_date);
        this.new_block_date = '';
    };
    SchedulePage.prototype.delete = function (i) {
        this.block_dates.splice(i, 1);
    };
    SchedulePage.prototype.dismiss = function () {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true,
            block_dates: this.block_dates
        });
    };
    SchedulePage.prototype.ionViewWillEnter = function () {
        // console.log(this.settings);
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
        var nextYear = function (sp) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //As January is 0.
            var yyyy = today.getFullYear() + 1;
            if (dd < 10)
                dd = '0' + dd;
            if (mm < 10)
                mm = '0' + mm;
            return (yyyy + sp + mm + sp + dd);
        };
        this.current_date = curday('-');
        this.next_year = nextYear('-');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SchedulePage.prototype, "block_dates", void 0);
    SchedulePage = __decorate([
        Component({
            selector: 'app-schedule',
            templateUrl: './schedule.page.html',
            styleUrls: ['./schedule.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            OrderPipe])
    ], SchedulePage);
    return SchedulePage;
}());
export { SchedulePage };
//# sourceMappingURL=schedule.page.js.map