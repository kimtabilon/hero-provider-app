import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResendemailPage } from './resendemail.page';
var routes = [
    {
        path: '',
        component: ResendemailPage
    }
];
var ResendemailPageModule = /** @class */ (function () {
    function ResendemailPageModule() {
    }
    ResendemailPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ResendemailPage]
        })
    ], ResendemailPageModule);
    return ResendemailPageModule;
}());
export { ResendemailPageModule };
//# sourceMappingURL=resendemail.module.js.map