import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
var InclusionPage = /** @class */ (function () {
    function InclusionPage(modalController) {
        this.modalController = modalController;
    }
    InclusionPage.prototype.ngOnInit = function () {
    };
    InclusionPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InclusionPage.prototype, "form", void 0);
    InclusionPage = __decorate([
        Component({
            selector: 'app-inclusion',
            templateUrl: './inclusion.page.html',
            styleUrls: ['./inclusion.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController])
    ], InclusionPage);
    return InclusionPage;
}());
export { InclusionPage };
//# sourceMappingURL=inclusion.page.js.map