import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HelpPage } from './help.page';
var routes = [
    {
        path: '',
        component: HelpPage
    }
];
var HelpPageModule = /** @class */ (function () {
    function HelpPageModule() {
    }
    HelpPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HelpPage]
        })
    ], HelpPageModule);
    return HelpPageModule;
}());
export { HelpPageModule };
//# sourceMappingURL=help.module.js.map