import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { OrderModule } from 'ngx-order-pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SchedulePageModule } from './schedule/schedule.module';
import { TermPageModule } from './term/term.module';
import { PrivacyPageModule } from './privacy/privacy.module';
import { ChatPageModule } from './chat/chat.module';
import { ReviewPageModule } from './review/review.module';
import { NetworkPageModule } from './network/network.module';
import { InclusionPageModule } from './inclusion/inclusion.module';
import { DirectionPageModule } from './direction/direction.module';
import { VaultPageModule } from './vault/vault.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { OneSignal } from '@ionic-native/onesignal/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                OrderModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                IonicStorageModule.forRoot(),
                SchedulePageModule,
                TermPageModule,
                PrivacyPageModule,
                IonicSelectableModule,
                ChatPageModule,
                ReviewPageModule,
                NetworkPageModule,
                InclusionPageModule,
                DirectionPageModule,
                VaultPageModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                NativeStorage,
                Camera,
                File,
                WebView,
                FilePath,
                AppVersion,
                Market,
                CallNumber,
                EmailComposer,
                OneSignal,
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map