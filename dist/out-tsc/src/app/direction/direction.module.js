import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DirectionPage } from './direction.page';
var routes = [
    {
        path: '',
        component: DirectionPage
    }
];
var DirectionPageModule = /** @class */ (function () {
    function DirectionPageModule() {
    }
    DirectionPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DirectionPage]
        })
    ], DirectionPageModule);
    return DirectionPageModule;
}());
export { DirectionPageModule };
//# sourceMappingURL=direction.module.js.map