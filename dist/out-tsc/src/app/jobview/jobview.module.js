import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { JobviewPage } from './jobview.page';
var routes = [
    {
        path: '',
        component: JobviewPage
    }
];
var JobviewPageModule = /** @class */ (function () {
    function JobviewPageModule() {
    }
    JobviewPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [JobviewPage]
        })
    ], JobviewPageModule);
    return JobviewPageModule;
}());
export { JobviewPageModule };
//# sourceMappingURL=jobview.module.js.map