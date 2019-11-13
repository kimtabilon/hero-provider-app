import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PrivacyPage } from './privacy.page';
var routes = [
    {
        path: '',
        component: PrivacyPage
    }
];
var PrivacyPageModule = /** @class */ (function () {
    function PrivacyPageModule() {
    }
    PrivacyPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PrivacyPage]
        })
    ], PrivacyPageModule);
    return PrivacyPageModule;
}());
export { PrivacyPageModule };
//# sourceMappingURL=privacy.module.js.map