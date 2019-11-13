import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: ProfilePage
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [ProfilePage]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map