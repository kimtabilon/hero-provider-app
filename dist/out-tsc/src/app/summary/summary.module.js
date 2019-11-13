import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SummaryPage } from './summary.page';
var routes = [
    {
        path: '',
        component: SummaryPage
    }
];
var SummaryPageModule = /** @class */ (function () {
    function SummaryPageModule() {
    }
    SummaryPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SummaryPage]
        })
    ], SummaryPageModule);
    return SummaryPageModule;
}());
export { SummaryPageModule };
//# sourceMappingURL=summary.module.js.map