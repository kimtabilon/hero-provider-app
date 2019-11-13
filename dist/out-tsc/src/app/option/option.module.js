import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OptionPage } from './option.page';
var routes = [
    {
        path: '',
        component: OptionPage
    }
];
var OptionPageModule = /** @class */ (function () {
    function OptionPageModule() {
    }
    OptionPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OptionPage]
        })
    ], OptionPageModule);
    return OptionPageModule;
}());
export { OptionPageModule };
//# sourceMappingURL=option.module.js.map