import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuController, NavController, ActionSheetController, ToastController, Platform, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';
import { SchedulePage } from '../schedule/schedule.page';
import { OrderPipe } from 'ngx-order-pipe';
var STORAGE_KEY = 'my_images';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(menu, authService, navCtrl, storage, alertService, router, activatedRoute, loading, http, env, camera, file, webview, actionSheetController, toastController, platform, loadingController, ref, filePath, modalController, alertController, orderPipe) {
        this.menu = menu;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertService = alertService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loading = loading;
        this.http = http;
        this.env = env;
        this.camera = camera;
        this.file = file;
        this.webview = webview;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.platform = platform;
        this.loadingController = loadingController;
        this.ref = ref;
        this.filePath = filePath;
        this.modalController = modalController;
        this.alertController = alertController;
        this.orderPipe = orderPipe;
        this.hero = [];
        this.account = {
            id: '',
            user_id: '',
            app_key: '',
            settings: {
                offline: false,
                auto_confirm: false,
                account_lock: true,
                preferred_location: [],
                block_dates: []
            },
            user: {
                id: '',
                email: '',
                password: '',
                status: ''
            },
            profile: {
                id: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                birthday: '',
                gender: '',
                photo: ''
            },
            contact: {
                id: '',
                profile_id: '',
                dial_code: '',
                number: ''
            },
            address: {
                id: '',
                profile_id: '',
                street: '',
                barangay: '',
                city: '',
                province: '',
                country: '',
                zip: ''
            }
        };
        this.photo = '';
        this.page = 'profile';
        this.preferredCities = [];
        this.province = [];
        this.images = [];
        this.provinces = [];
        this.cities = [];
        this.barangays = [];
        this.reviews = [];
        this.logs = [];
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.loadStoredImages();
        });
    };
    ProfilePage.prototype.doRefresh = function (event) {
        var _this = this;
        this.http.post(this.env.HERO_API + 'hero/login', { email: this.account.user.email, password: this.account.user.password })
            .subscribe(function (data) {
            var response = data;
            _this.storage.set('hero', response);
            // this.user = response.data;
            _this.ionViewWillEnter();
        }, function (error) {
            _this.authService.http_error(error);
            _this.logout();
            console.log(error);
        });
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    ProfilePage.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: SchedulePage,
                            componentProps: { block_dates: this.account.settings.block_dates }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            // const user = data['data']; // Here's your selected user!
                            var response = data;
                            _this.account.settings.block_dates = response.data.block_dates;
                            _this.saveSettings();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.storage.get('hero').then(function (val) {
            _this.hero = val;
            _this.account.user = val.data;
            _this.account.profile = val.data.profile;
            _this.account.user_id = _this.account.user.id;
            _this.account.app_key = _this.env.APP_ID;
            if (_this.account.profile.addresses.length) {
                _this.account.address = _this.account.profile.addresses[0];
            }
            else {
                _this.account.address = {
                    id: '',
                    profile_id: _this.account.profile.id,
                    street: '',
                    barangay: '',
                    city: '',
                    province: '',
                    country: '',
                    zip: ''
                };
            }
            if (_this.account.profile.contacts.length) {
                _this.account.contact = _this.account.profile.contacts[0];
            }
            else {
                _this.account.contact = {
                    id: '',
                    profile_id: _this.account.profile.id,
                    dial_code: '',
                    number: ''
                };
            }
            if (_this.account.profile.photo !== null) {
                _this.photo = _this.env.IMAGE_URL + 'uploads/' + _this.account.profile.photo;
            }
            else {
                _this.photo = _this.env.DEFAULT_IMG;
            }
            _this.http.post(_this.env.HERO_API + 'account_settings/byUser', { user_id: _this.account.user.id, app_key: _this.env.APP_ID })
                .subscribe(function (data) {
                // this.storage.set('hero', data);
                var response = data;
                _this.account.settings = JSON.parse(response.data.settings);
                _this.account.id = response.data.id;
                // console.log(this.account.settings);
            }, function (error) {
                if (error.error) {
                    var err = error.error;
                    var label = '';
                    label = err.message + ' at line ' + err.line + ' in ' + err.file;
                    _this.authService.log('0', 'system_error', label);
                }
                var settings = JSON.stringify(_this.account.settings);
                _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: settings })
                    .subscribe(function (data) {
                    var response = data;
                    _this.account.settings = JSON.parse(response.data.settings);
                    _this.account.id = response.data.id;
                }, function (error) {
                    _this.authService.http_error(error);
                    _this.alertService.presentToast("Server not responding!");
                }, function () {
                });
            }, function () {
                // this.alertService.presentToast("Settings saved."); 
            });
            fetch('./assets/json/refprovince.json').then(function (res) { return res.json(); })
                .then(function (json) {
                // console.log(json.RECORDS);
                var records = json.RECORDS;
                var province = records.filter(function (item) { return item.provDesc === _this.account.address.province; })[0];
                _this.provinces = _this.orderPipe.transform(records, 'provDesc');
                fetch('./assets/json/refcitymun.json').then(function (res) { return res.json(); })
                    .then(function (json) {
                    // console.log(json.RECORDS);
                    var records = json.RECORDS;
                    var city = records.filter(function (item) { return item.citymunDesc === _this.account.address.city; })[0];
                    _this.cities = records.filter(function (item) { return item.provCode === province.provCode; });
                    _this.cities = _this.orderPipe.transform(_this.cities, 'citymunDesc');
                    fetch('./assets/json/refbrgy.json').then(function (res) { return res.json(); })
                        .then(function (json) {
                        var records = json.RECORDS;
                        _this.barangays = records.filter(function (item) { return item.citymunCode === city.citymunCode; });
                        _this.barangays = _this.orderPipe.transform(_this.barangays, 'brgyDesc');
                    });
                });
            });
            _this.loading.dismiss();
        });
    };
    ProfilePage.prototype.tapProvince = function (event) {
        var _this = this;
        var prov = event.detail.value;
        fetch('./assets/json/refprovince.json').then(function (res) { return res.json(); })
            .then(function (json) {
            var records = json.RECORDS;
            var province = records.filter(function (item) { return item.provDesc === prov; })[0];
            fetch('./assets/json/refcitymun.json').then(function (res) { return res.json(); })
                .then(function (json) {
                var records = json.RECORDS;
                _this.cities = records.filter(function (item) { return item.provCode === province.provCode; });
                _this.cities = _this.orderPipe.transform(_this.cities, 'citymunDesc');
            });
        });
    };
    ;
    ProfilePage.prototype.tapCity = function (event) {
        var _this = this;
        var ci = event.detail.value;
        fetch('./assets/json/refcitymun.json').then(function (res) { return res.json(); })
            .then(function (json) {
            var records = json.RECORDS;
            var city = records.filter(function (item) { return item.citymunDesc === ci; })[0];
            fetch('./assets/json/refbrgy.json').then(function (res) { return res.json(); })
                .then(function (json) {
                var records = json.RECORDS;
                _this.barangays = records.filter(function (item) { return item.citymunCode === city.citymunCode; });
                _this.barangays = _this.orderPipe.transform(_this.barangays, 'brgyDesc');
            });
        });
    };
    ;
    ProfilePage.prototype.tapBarangay = function (event) {
    };
    ;
    ProfilePage.prototype.savePreferredLocation = function () {
        var _this = this;
        // console.log(this.account.settings.preferred_location);
        this.loading.present();
        var settings = JSON.stringify(this.account.settings);
        this.http.post(this.env.HERO_API + 'account_settings/save', { user_id: this.account.user.id, app_key: this.env.APP_ID, settings: settings })
            .subscribe(function (data) {
            _this.loading.dismiss();
        }, function (error) {
            _this.authService.http_error(error);
            _this.alertService.presentToast("Server not responding!");
            _this.loading.dismiss();
        }, function () {
            // this.alertService.presentToast("Settings Saved"); 
        });
    };
    ProfilePage.prototype.saveSettings = function () {
        var _this = this;
        this.loading.present();
        var settings = JSON.stringify(this.account.settings);
        console.log('Saving...');
        this.http.post(this.env.HERO_API + 'account_settings/save', { user_id: this.account.user.id, app_key: this.env.APP_ID, settings: settings })
            .subscribe(function (data) {
            var response = data;
            _this.account.settings = JSON.parse(response.data.settings);
            _this.account.id = response.data.id;
            _this.loading.dismiss();
            console.log('DONE');
        }, function (error) {
            _this.authService.http_error(error);
            _this.alertService.presentToast("Server not responding!");
            _this.loading.dismiss();
        }, function () {
            // this.alertService.presentToast("Settings Saved"); 
        });
        // console.log(this.account);
    };
    ProfilePage.prototype.segmentChanged = function (ev) {
        var _this = this;
        switch (ev.detail.value) {
            case "profile":
                this.loading.present();
                this.page = 'profile';
                this.loading.dismiss();
                break;
            case "settings":
                this.loading.present();
                fetch('./assets/json/refprovince.json').then(function (res) { return res.json(); })
                    .then(function (json) {
                    var records = json.RECORDS;
                    _this.province = records.filter(function (item) { return item.provDesc === _this.account.address.province; });
                });
                fetch('./assets/json/refcitymun.json').then(function (res) { return res.json(); })
                    .then(function (json) {
                    var records = json.RECORDS;
                    _this.preferredCities = records.filter(function (item) { return item.provCode === _this.province[0].provCode; });
                    _this.preferredCities = _this.orderPipe.transform(_this.preferredCities, 'provDesc');
                    // console.log(this.cities);
                });
                this.page = 'settings';
                this.loading.dismiss();
                break;
            case "logs":
                this.loading.present();
                this.page = 'logs';
                this.http.post(this.env.HERO_API + 'logs/byUser', { user_id: this.account.user.id, app_key: this.env.APP_ID })
                    .subscribe(function (data) {
                    var response = data;
                    _this.logs = response.data;
                    console.log(response);
                }, function (error) {
                    _this.alertService.presentToast("Somethings went wrong");
                    console.log(error);
                }, function () { });
                this.loading.dismiss();
                break;
            case "reviews":
                this.loading.present();
                this.http.post(this.env.HERO_API + 'reviews/byProvider', { hero_id: this.account.user.id })
                    .subscribe(function (data) {
                    var response = data;
                    _this.reviews = response.data;
                }, function (error) {
                    _this.alertService.presentToast("Somethings went wrong");
                }, function () { });
                this.page = 'reviews';
                this.loading.dismiss();
                break;
            default:
                // code...
                break;
        }
    };
    ProfilePage.prototype.tapUpdate = function () {
        var _this = this;
        this.loading.present();
        this.http.post(this.env.HERO_API + 'profile/modify', { user: this.account.user })
            .subscribe(function (data) {
            _this.storage.set('hero', data);
        }, function (error) {
            _this.authService.http_error(error);
            _this.alertService.presentToast("Server not responding!");
        }, function () { _this.alertService.presentToast("Profile updated!"); });
        this.loading.dismiss();
    };
    ProfilePage.prototype.parse = function (customer_info) {
        return JSON.parse(customer_info);
    };
    ProfilePage.prototype.tapUpdateAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Send updated account information?',
                            message: 'Admin will review  the changes you have made. Once you proceed, profile will be locked for any changes.',
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Continue',
                                    handler: function () {
                                        _this.loading.present();
                                        var account = JSON.parse(JSON.stringify(_this.account));
                                        var inbox = {};
                                        delete account.profile.addresses;
                                        delete account.profile.contacts;
                                        delete account.user.profile;
                                        delete account.settings;
                                        delete account.profile.created_at;
                                        delete account.profile.deleted_at;
                                        delete account.profile.updated_at;
                                        delete account.address.profile_id;
                                        delete account.address.created_at;
                                        delete account.address.deleted_at;
                                        delete account.address.updated_at;
                                        delete account.contact.profile_id;
                                        delete account.contact.created_at;
                                        delete account.contact.deleted_at;
                                        delete account.contact.updated_at;
                                        delete account.user.profile_id;
                                        delete account.user.created_at;
                                        delete account.user.deleted_at;
                                        delete account.user.updated_at;
                                        inbox.user_id = account.user_id;
                                        inbox.app_key = account.app_key;
                                        inbox.data = JSON.stringify({
                                            hero: account.user,
                                            profile: account.profile,
                                            address: account.address,
                                            contact: account.contact,
                                        });
                                        inbox.request = 'Request for account update.';
                                        inbox.type = 'Update Account';
                                        inbox.link = '<ul><li><a href="' + _this.env.HERO_ADMIN + 'profiles/' + account.profile.id + '/edit" target="_blank">Goto Profile</a></li>' +
                                            '<li><a href="' + _this.env.HERO_ADMIN + 'heroes/' + account.user.id + '/edit" target="_blank">Goto Hero</a></li>' +
                                            '<li><a href="' + _this.env.HERO_ADMIN + 'addresses/' + account.address.id + '/edit" target="_blank">Goto Address</a></li>' +
                                            '<li><a href="' + _this.env.HERO_ADMIN + 'contacts/' + account.contact.id + '/edit" target="_blank">Goto Contact</a></li></ul>';
                                        _this.http.post(_this.env.HERO_API + 'admin_inboxes/save', inbox)
                                            .subscribe(function (data) {
                                            // this.storage.set('hero', data);
                                        }, function (error) {
                                            _this.alertService.presentToast("Server not responding!");
                                            _this.authService.http_error(error);
                                        }, function () {
                                            _this.alertService.presentToast("Your request has been sent.");
                                        });
                                        _this.account.settings.account_lock = true;
                                        var settings = JSON.stringify(_this.account.settings);
                                        _this.http.post(_this.env.HERO_API + 'account_settings/save', { user_id: _this.account.user.id, app_key: _this.env.APP_ID, settings: settings })
                                            .subscribe(function (data) {
                                            var response = data;
                                            _this.account.settings = JSON.parse(response.data.settings);
                                            _this.account.id = response.data.id;
                                        }, function (error) {
                                            _this.alertService.presentToast("Server not responding!");
                                            _this.authService.http_error(error);
                                            console.log(error);
                                        }, function () {
                                            // this.alertService.presentToast("Account"); 
                                        });
                                        _this.loading.dismiss();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.tapUpdateAddr = function () {
        var _this = this;
        this.loading.present();
        /*Confirm Jobs*/
        this.http.post(this.env.HERO_API + 'address/modify', { address: this.account.address })
            .subscribe(function (data) {
            _this.hero.data.profile.addresses[0] = _this.account.address;
            _this.storage.set('hero', _this.hero);
        }, function (error) {
            _this.alertService.presentToast("Server not responding!");
            console.log(error.error);
            _this.authService.http_error(error);
        }, function () { _this.alertService.presentToast("Address updated!"); });
        this.loading.dismiss();
    };
    ProfilePage.prototype.tapUpdateContact = function () {
        var _this = this;
        this.loading.present();
        /*Confirm Jobs*/
        this.http.post(this.env.HERO_API + 'contact/modify', { contact: this.account.contact })
            .subscribe(function (data) {
            _this.hero.data.profile.contacts[0] = _this.account.contact;
            _this.storage.set('hero', _this.hero);
        }, function (error) {
            _this.alertService.presentToast("Server not responding!");
        }, function () { _this.alertService.presentToast("Contact updated!"); });
        this.loading.dismiss();
    };
    ProfilePage.prototype.presentAlertConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Request access?',
                            message: 'Wait for admin confirmation to access and modify your account information.',
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Send Request',
                                    handler: function () {
                                        // console.log('Confirm Okay');
                                        var request = 'Hero Requesting access to edit account information.';
                                        var link = '<a href="' + _this.env.HERO_ADMIN + 'accountSettings/' + _this.account.id + '/edit" target="_blank">Goto Account Setting</a>';
                                        _this.http.post(_this.env.HERO_API + 'admin_inboxes/save', { request: request, link: link, type: 'Unlock Account', data: '' })
                                            .subscribe(function (data) {
                                            // this.storage.set('hero', data);
                                        }, function (error) {
                                            _this.alertService.presentToast("Server not responding!");
                                            console.log(error);
                                            _this.authService.http_error(error);
                                        }, function () {
                                            _this.alertService.presentToast("Request Sent");
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.loadStoredImages = function () {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            if (images) {
                var arr = JSON.parse(images);
                _this.images = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var img = arr_1[_i];
                    var filePath = _this.file.dataDirectory + img;
                    var resPath = _this.pathForImage(filePath);
                    _this.images.push({ name: img, path: resPath, filePath: filePath });
                }
            }
        });
    };
    ProfilePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            var converted = this.webview.convertFileSrc(img);
            return converted;
        }
    };
    ProfilePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    ProfilePage.prototype.selectImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Select Image source",
                            buttons: [{
                                    text: 'Load from Library',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                },
                                {
                                    text: 'Use Camera',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imagePath) {
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        });
    };
    ProfilePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.updateStoredImages(newFileName);
        }, function (error) {
            _this.alertService.presentToast('Error while storing file.');
        });
    };
    ProfilePage.prototype.updateStoredImages = function (name) {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            if (!arr) {
                var newImages = [name];
                _this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            }
            else {
                arr.push(name);
                _this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }
            var filePath = _this.file.dataDirectory + name;
            var resPath = _this.pathForImage(filePath);
            var newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            _this.images = [newEntry, _this.images];
            _this.ref.detectChanges(); // trigger change detection cycle
        });
    };
    ProfilePage.prototype.deleteImage = function (imgEntry, position) {
        var _this = this;
        this.images.splice(position, 1);
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            var filtered = arr.filter(function (name) { return name != imgEntry.name; });
            _this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
            var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
            _this.file.removeFile(correctPath, imgEntry.name).then(function (res) {
                _this.alertService.presentToast('File removed.');
            });
        });
    };
    ProfilePage.prototype.startUpload = function (imgEntry) {
        var _this = this;
        // this.photo = imgEntry.path;
        this.account.profile.photo = imgEntry.name;
        this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
            .then(function (entry) {
            entry.file(function (file) { return _this.readFile(file); });
        })
            .catch(function (err) {
            _this.alertService.presentToast('Error while reading file.');
        });
    };
    ProfilePage.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob, file.name);
            _this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    ProfilePage.prototype.uploadImageData = function (formData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // const loading = await this.loadingController.create({
                //     content: 'Uploading image...',
                // });
                // await loading.present();
                this.loading.present();
                this.http.post(this.env.IMAGE_URL + 'upload.php', formData)
                    .pipe(finalize(function () {
                    // loading.dismiss();
                    _this.loading.dismiss();
                }))
                    .subscribe(function (res) {
                    if (res['success']) {
                        _this.alertService.presentToast('Done. Update your profile now.');
                        _this.page = 'profile';
                    }
                    else {
                        _this.alertService.presentToast('Photo not uploading.');
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProfilePage.prototype.logout = function () {
        this.loading.present();
        this.authService.logout();
        this.alertService.presentToast('Successfully logout');
        this.navCtrl.navigateRoot('/login');
        this.loading.dismiss();
    };
    ProfilePage = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            AuthService,
            NavController,
            Storage,
            AlertService,
            Router,
            ActivatedRoute,
            LoadingService,
            HttpClient,
            EnvService,
            Camera,
            File,
            WebView,
            ActionSheetController,
            ToastController,
            Platform,
            LoadingController,
            ChangeDetectorRef,
            FilePath,
            ModalController,
            AlertController,
            OrderPipe])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map