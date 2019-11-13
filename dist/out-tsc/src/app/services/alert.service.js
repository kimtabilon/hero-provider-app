import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
var AlertService = /** @class */ (function () {
    function AlertService(toastController) {
        this.toastController = toastController;
    }
    AlertService.prototype.presentToast = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 4000,
                            position: 'top',
                            color: 'dark',
                            showCloseButton: true
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ToastController])
    ], AlertService);
    return AlertService;
}());
export { AlertService };
//# sourceMappingURL=alert.service.js.map