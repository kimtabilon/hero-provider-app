import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginresetPage } from './loginreset.page';
var routes = [
    {
        path: '',
        component: LoginresetPage
    }
];
var LoginresetPageModule = /** @class */ (function () {
    function LoginresetPageModule() {
    }
    LoginresetPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoginresetPage]
        })
    ], LoginresetPageModule);
    return LoginresetPageModule;
}());
export { LoginresetPageModule };
//# sourceMappingURL=loginreset.module.js.map