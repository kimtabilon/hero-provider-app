import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TermPage } from './term.page';
var routes = [
    {
        path: '',
        component: TermPage
    }
];
var TermPageModule = /** @class */ (function () {
    function TermPageModule() {
    }
    TermPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TermPage]
        })
    ], TermPageModule);
    return TermPageModule;
}());
export { TermPageModule };
//# sourceMappingURL=term.module.js.map