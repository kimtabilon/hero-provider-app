import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdsPage } from './ads.page';
var routes = [
    {
        path: '',
        component: AdsPage
    }
];
var AdsPageModule = /** @class */ (function () {
    function AdsPageModule() {
    }
    AdsPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AdsPage]
        })
    ], AdsPageModule);
    return AdsPageModule;
}());
export { AdsPageModule };
//# sourceMappingURL=ads.module.js.map