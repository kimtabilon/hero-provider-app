import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
var TermPage = /** @class */ (function () {
    function TermPage(modalController, alertController, env) {
        this.modalController = modalController;
        this.alertController = alertController;
        this.env = env;
    }
    TermPage.prototype.ngOnInit = function () {
    };
    TermPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    TermPage = __decorate([
        Component({
            selector: 'app-term',
            templateUrl: './term.page.html',
            styleUrls: ['./term.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController,
            EnvService])
    ], TermPage);
    return TermPage;
}());
export { TermPage };
//# sourceMappingURL=term.page.js.map