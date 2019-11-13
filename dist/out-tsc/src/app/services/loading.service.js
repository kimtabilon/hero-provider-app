import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
var LoadingService = /** @class */ (function () {
    function LoadingService(loadingController) {
        this.loadingController = loadingController;
        this.isLoading = false;
    }
    LoadingService.prototype.present = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.loadingController.create({
                                duration: 5000,
                                spinner: 'crescent',
                                cssClass: 'custom-loader-class'
                            }).then(function (a) {
                                a.present().then(function () {
                                    // console.log('presented');
                                    if (!_this.isLoading) {
                                        // a.dismiss().then(() => console.log('abort presenting'));
                                        a.dismiss();
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoadingService.prototype.dismiss = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = false;
                        return [4 /*yield*/, this.loadingController.dismiss()];
                    case 1: 
                    // return await this.loadingController.dismiss().then(() => console.log('dismissed'));
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoadingService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [LoadingController])
    ], LoadingService);
    return LoadingService;
}());
export { LoadingService };
//# sourceMappingURL=loading.service.js.map