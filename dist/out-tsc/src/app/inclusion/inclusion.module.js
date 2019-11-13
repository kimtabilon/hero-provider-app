import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InclusionPage } from './inclusion.page';
var routes = [
    {
        path: '',
        component: InclusionPage
    }
];
var InclusionPageModule = /** @class */ (function () {
    function InclusionPageModule() {
    }
    InclusionPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [InclusionPage]
        })
    ], InclusionPageModule);
    return InclusionPageModule;
}());
export { InclusionPageModule };
//# sourceMappingURL=inclusion.module.js.map