import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: RegisterPage
    }
];
var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule,
            ],
            declarations: [RegisterPage]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());
export { RegisterPageModule };
//# sourceMappingURL=register.module.js.map