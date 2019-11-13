import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
var ChatPage = /** @class */ (function () {
    function ChatPage(modalController, alertController, env, http, loading, alertService) {
        this.modalController = modalController;
        this.alertController = alertController;
        this.env = env;
        this.http = http;
        this.loading = loading;
        this.alertService = alertService;
        this.messages = [];
        this.provider = {};
        this.client = {};
    }
    ChatPage.prototype.ngOnInit = function () {
    };
    ChatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.provider.photo = this.env.DEFAULT_IMG;
        this.provider.name = this.job.hero.profile.first_name + ' ' + this.job.hero.profile.last_name;
        if (this.job.hero.profile.photo !== null) {
            this.provider.photo = this.env.IMAGE_URL + 'uploads/' + this.job.hero.profile.photo;
        }
        this.client.photo = this.customer.photo;
        this.client.name = this.customer.name;
        this.http.post(this.env.HERO_API + 'chats/byJob', { job_id: this.job.id })
            .subscribe(function (data) {
            var response = data;
            _this.messages = response.data;
            setTimeout(function () {
                if (_this.content.scrollToBottom) {
                    _this.content.scrollToBottom(400);
                }
            }, 500);
            setInterval(function () {
                _this.http.post(_this.env.HERO_API + 'chats/byJob', { job_id: _this.job.id })
                    .subscribe(function (data) {
                    var response = data;
                    _this.messages = response.data;
                    setTimeout(function () {
                        if (_this.content.scrollToBottom) {
                            _this.content.scrollToBottom(400);
                        }
                    }, 500);
                }, function (error) {
                    console.log(error);
                });
                // this.content.scrollToBottom(400);  
            }, 20000);
        }, function (error) {
            console.log(error);
        });
    };
    ChatPage.prototype.send = function () {
        var _this = this;
        this.messages.push({
            'from': 'provider',
            'chat': this.chat
        });
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom(400);
            }
        }, 500);
        this.http.post(this.env.HERO_API + 'chats/save', {
            xjob_id: this.job.id,
            xchat: this.chat,
            xfrom: 'provider'
        })
            .subscribe(function (data) {
            var response = data;
        }, function (error) {
            console.log(error);
        });
        this.chat = '';
    };
    ChatPage.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true,
            input: {}
        });
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "content", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "job", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "customer", void 0);
    ChatPage = __decorate([
        Component({
            selector: 'app-chat',
            templateUrl: './chat.page.html',
            styleUrls: ['./chat.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController,
            EnvService,
            HttpClient,
            LoadingService,
            AlertService])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.page.js.map