import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
var NetworkPage = /** @class */ (function () {
    function NetworkPage(modalController) {
        this.modalController = modalController;
    }
    NetworkPage.prototype.ngOnInit = function () {
    };
    NetworkPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NetworkPage.prototype, "error", void 0);
    NetworkPage = __decorate([
        Component({
            selector: 'app-network',
            templateUrl: './network.page.html',
            styleUrls: ['./network.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController])
    ], NetworkPage);
    return NetworkPage;
}());
export { NetworkPage };
//# sourceMappingURL=network.page.js.map