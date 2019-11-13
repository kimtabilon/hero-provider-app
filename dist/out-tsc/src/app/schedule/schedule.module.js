import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SchedulePage } from './schedule.page';
var routes = [
    {
        path: '',
        component: SchedulePage
    }
];
var SchedulePageModule = /** @class */ (function () {
    function SchedulePageModule() {
    }
    SchedulePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SchedulePage]
        })
    ], SchedulePageModule);
    return SchedulePageModule;
}());
export { SchedulePageModule };
//# sourceMappingURL=schedule.module.js.map