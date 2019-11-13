import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NetworkPage } from './network.page';
var routes = [
    {
        path: '',
        component: NetworkPage
    }
];
var NetworkPageModule = /** @class */ (function () {
    function NetworkPageModule() {
    }
    NetworkPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NetworkPage]
        })
    ], NetworkPageModule);
    return NetworkPageModule;
}());
export { NetworkPageModule };
//# sourceMappingURL=network.module.js.map