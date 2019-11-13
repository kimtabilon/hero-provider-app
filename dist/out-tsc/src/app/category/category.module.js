import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoryPage } from './category.page';
var routes = [
    {
        path: '',
        component: CategoryPage
    }
];
var CategoryPageModule = /** @class */ (function () {
    function CategoryPageModule() {
    }
    CategoryPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CategoryPage]
        })
    ], CategoryPageModule);
    return CategoryPageModule;
}());
export { CategoryPageModule };
//# sourceMappingURL=category.module.js.map