import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VaultPage } from './vault.page';
var routes = [
    {
        path: '',
        component: VaultPage
    }
];
var VaultPageModule = /** @class */ (function () {
    function VaultPageModule() {
    }
    VaultPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VaultPage]
        })
    ], VaultPageModule);
    return VaultPageModule;
}());
export { VaultPageModule };
//# sourceMappingURL=vault.module.js.map