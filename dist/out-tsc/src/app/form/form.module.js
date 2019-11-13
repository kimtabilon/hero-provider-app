import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormPage } from './form.page';
var routes = [
    {
        path: '',
        component: FormPage
    }
];
var FormPageModule = /** @class */ (function () {
    function FormPageModule() {
    }
    FormPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FormPage]
        })
    ], FormPageModule);
    return FormPageModule;
}());
export { FormPageModule };
//# sourceMappingURL=form.module.js.map