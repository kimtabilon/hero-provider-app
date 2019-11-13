import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
var EnvService = /** @class */ (function () {
    /** TEST ENVIRONMENT */
    // ENVIRONMENT = 'test';
    // API_URL = 'http://herotestserver.herokuapp.com/api/';
    // HERO_ADMIN = 'http://herotestserver.herokuapp.com/';
    // HERO_API = 'http://herotestserver.herokuapp.com/api/';
    function EnvService() {
        this.IMAGE_URL = 'http://www.mjsitechsolutions.com/heroimages/';
        this.DEFAULT_IMG = '../../assets/img/blank-profile.png';
        this.APP_ID = 'heroPROasdfr45fd';
        this.ONESIGNAL_APP_ID = 'a367acdc-a0a1-41cf-a58c-ada4a06ed671';
        this.FCM_SENDER_ID = '240609983489';
        /** LIVE ENVIRONMENT */
        // ENVIRONMENT = 'live';
        // API_URL = 'http://heroserviceprovider.herokuapp.com/api/';
        // HERO_ADMIN = 'http://heroserviceprovider.herokuapp.com/';
        // HERO_API = 'http://heroserviceprovider.herokuapp.com/api/';
        /** LOCAL ENVIRONMENT */
        this.ENVIRONMENT = 'local';
        this.API_URL = 'http://127.0.0.1:8000/api/';
        this.HERO_ADMIN = 'http://127.0.0.1:8000/';
        this.HERO_API = 'http://127.0.0.1:8000/api/';
    }
    EnvService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], EnvService);
    return EnvService;
}());
export { EnvService };
//# sourceMappingURL=env.service.js.map