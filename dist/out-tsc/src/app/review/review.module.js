import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReviewPage } from './review.page';
var routes = [
    {
        path: '',
        component: ReviewPage
    }
];
var ReviewPageModule = /** @class */ (function () {
    function ReviewPageModule() {
    }
    ReviewPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ReviewPage]
        })
    ], ReviewPageModule);
    return ReviewPageModule;
}());
export { ReviewPageModule };
//# sourceMappingURL=review.module.js.map