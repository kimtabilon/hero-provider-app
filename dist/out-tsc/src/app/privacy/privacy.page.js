import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(modalController, alertController, env) {
        this.modalController = modalController;
        this.alertController = alertController;
        this.env = env;
    }
    PrivacyPage.prototype.ngOnInit = function () {
    };
    PrivacyPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    PrivacyPage = __decorate([
        Component({
            selector: 'app-privacy',
            templateUrl: './privacy.page.html',
            styleUrls: ['./privacy.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController,
            EnvService])
    ], PrivacyPage);
    return PrivacyPage;
}());
export { PrivacyPage };
//# sourceMappingURL=privacy.page.js.map