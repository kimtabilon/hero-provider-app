import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'service', loadChildren: './service/service.module#ServicePageModule' },
    { path: 'option', loadChildren: './option/option.module#OptionPageModule' },
    { path: 'form', loadChildren: './form/form.module#FormPageModule' },
    { path: 'hero', loadChildren: './hero/hero.module#HeroPageModule' },
    { path: 'summary', loadChildren: './summary/summary.module#SummaryPageModule' },
    { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
    { path: 'job', loadChildren: './job/job.module#JobPageModule' },
    { path: 'quotation', loadChildren: './quotation/quotation.module#QuotationPageModule' },
    { path: 'jobview', loadChildren: './jobview/jobview.module#JobviewPageModule' },
    { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
    { path: 'loginreset', loadChildren: './loginreset/loginreset.module#LoginresetPageModule' },
    { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
    { path: 'term', loadChildren: './term/term.module#TermPageModule' },
    { path: 'resendemail', loadChildren: './resendemail/resendemail.module#ResendemailPageModule' },
    { path: 'inclusion', loadChildren: './inclusion/inclusion.module#InclusionPageModule' },
    { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
    { path: 'direction', loadChildren: './direction/direction.module#DirectionPageModule' },
    { path: 'vault', loadChildren: './vault/vault.module#VaultPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map