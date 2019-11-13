import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeroPage } from './hero.page';
var routes = [
    {
        path: '',
        component: HeroPage
    }
];
var HeroPageModule = /** @class */ (function () {
    function HeroPageModule() {
    }
    HeroPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HeroPage]
        })
    ], HeroPageModule);
    return HeroPageModule;
}());
export { HeroPageModule };
//# sourceMappingURL=hero.module.js.map