import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { OrderPipe } from 'ngx-order-pipe';
import { TermPage } from '../term/term.page';
import { PrivacyPage } from '../privacy/privacy.page';
var Port = /** @class */ (function () {
    function Port() {
    }
    return Port;
}());
var RegisterPage = /** @class */ (function () {
    function RegisterPage(http, modalController, authService, navCtrl, alertService, storage, loading, env, formBuilder, orderPipe, alertCtrl) {
        this.http = http;
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.storage = storage;
        this.loading = loading;
        this.env = env;
        this.formBuilder = formBuilder;
        this.orderPipe = orderPipe;
        this.alertCtrl = alertCtrl;
        this.provinces = [];
        this.cities = [];
        this.barangays = [];
        this.eightenyearsAgo = '';
        this.signup_btn = 'SIGN UP';
        this.validation_messages = {
            // 'username': [
            //   { type: 'required', message: 'Username is required.' },
            //   { type: 'minlength', message: 'Username must be at least 5 characters long.' },
            //   { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
            //   { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
            //   { type: 'validUsername', message: 'Your username has already been taken.' }
            // ],
            'first_name': [
                { type: 'required', message: 'First name is required.' },
                { type: 'pattern', message: 'Your firstname must contain only letters.' }
            ],
            'last_name': [
                { type: 'required', message: 'Last name is required.' },
                { type: 'pattern', message: 'Your lastname must contain only letters.' }
            ],
            'birthday': [
                { type: 'required', message: 'Birthday is required.' }
            ],
            'birthyear': [
                { type: 'required', message: 'Year is required.' }
            ],
            'birthmonth': [
                { type: 'required', message: 'Month is required.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'phone': [
                { type: 'required', message: 'Phone is required.' },
                { type: 'validCountryPhone', message: 'The phone is incorrect.' }
            ],
            'street': [
                { type: 'required', message: 'Street is required.' }
            ],
            'barangay': [
                { type: 'required', message: 'Barangay is required.' }
            ],
            'city': [
                { type: 'required', message: 'City is required.' }
            ],
            'province': [
                { type: 'required', message: 'Province is required.' }
            ],
            'country': [
                { type: 'required', message: 'Country is required.' }
            ],
            'zip': [
                { type: 'required', message: 'Zip is required.' },
                { type: 'minlength', message: 'Zip must be at least 4 characters long.' },
                { type: 'maxlength', message: 'Zip cannot be more than 4 characters long.' },
                { type: 'pattern', message: 'Your zip must contain only numbers.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required.' }
            ],
            'matching_passwords': [
                { type: 'areEqual', message: 'Password mismatch.' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
        };
    }
    RegisterPage.prototype.tapProvince = function (event) {
        var _this = this;
        // console.log(event.detail.value);
        var province = event.value;
        fetch('./assets/json/refcitymun.json').then(function (res) { return res.json(); })
            .then(function (json) {
            // console.log(json.RECORDS);
            var records = json.RECORDS;
            _this.cities = records.filter(function (item) { return item.provCode === province.provCode; });
            _this.cities = _this.orderPipe.transform(_this.cities, 'citymunDesc');
            // console.log(this.cities);
        });
    };
    ;
    RegisterPage.prototype.tapCity = function (event) {
        var _this = this;
        // console.log(event.detail.value);
        var city = event.value;
        fetch('./assets/json/refbrgy.json').then(function (res) { return res.json(); })
            .then(function (json) {
            // console.log(json.RECORDS);
            var records = json.RECORDS;
            _this.barangays = records.filter(function (item) { return item.citymunCode === city.citymunCode; });
            _this.barangays = _this.orderPipe.transform(_this.barangays, 'brgyDesc');
            // console.log(this.barangays);
        });
    };
    ;
    RegisterPage.prototype.tapBarangay = function (event) {
        // console.log(event.detail.value);
    };
    ;
    RegisterPage.prototype.ngOnInit = function () {
        var _this = this;
        fetch('./assets/json/refprovince.json').then(function (res) { return res.json(); })
            .then(function (json) {
            // console.log(json.RECORDS);
            _this.provinces = _this.orderPipe.transform(json.RECORDS, 'provDesc');
        });
        this.countries = [
            new CountryPhone('PH', 'PHILIPPINES')
        ];
        this.genders = [
            "Male",
            "Female"
        ];
        this.matching_passwords_group = new FormGroup({
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])),
            confirm_password: new FormControl('', Validators.required)
        }, function (formGroup) {
            return PasswordValidator.areEqual(formGroup);
        });
        var country = new FormControl(this.countries[0], Validators.required);
        var phone = new FormControl('', Validators.compose([
            Validators.required,
            PhoneValidator.validCountryPhone(country)
        ]));
        this.country_phone_group = new FormGroup({
            country: country,
            phone: phone
        });
        this.validations_form = this.formBuilder.group({
            // username: new FormControl('', Validators.compose([
            //   UsernameValidator.validUsername,
            //   Validators.maxLength(25),
            //   Validators.minLength(5),
            //   Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            //   Validators.required
            // ])),
            // first_name: new FormControl('', Validators.required),
            first_name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z]+')
            ])),
            middle_name: new FormControl(''),
            last_name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z]+')
            ])),
            birthday: new FormControl('', Validators.required),
            birthyear: new FormControl('', Validators.required),
            birthmonth: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            country_phone: this.country_phone_group,
            street: new FormControl('', Validators.required),
            barangay: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            country: new FormControl('PHILIPPINES', Validators.required),
            zip: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(4),
                Validators.minLength(4),
                Validators.pattern('[0-9]+')
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            matching_passwords: this.matching_passwords_group,
        });
    };
    RegisterPage.prototype.notifyEmailExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Email Issue',
                            message: 'Email already used.',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        _this.navCtrl.navigateRoot('/login');
                                    }
                                },
                                {
                                    text: 'Try Again',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
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
    RegisterPage.prototype.notifyRegistrationSuccess = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Success',
                            message: 'You are now registered! Check your e-mail for account activation. If you don\'t receive an e-mail from us, tap Resend.',
                            buttons: [
                                {
                                    text: 'Resend',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.notifyRegistrationSuccess(email, password);
                                        _this.http.post(_this.env.API_URL + 'hero/mail/resendactivation', { password: password, email: email, app_key: _this.env.APP_ID })
                                            .subscribe(function (data) {
                                            var response = data;
                                            _this.loading.dismiss();
                                            _this.alertService.presentToast("Check your Email for your Activation Link");
                                            _this.authService.log(response.data.id, 'resend_activation', 'Resend activation link');
                                        }, function (error) {
                                            console.log(error);
                                            _this.authService.http_error(error);
                                            _this.loading.dismiss();
                                            _this.alertService.presentToast("Account not Found");
                                        });
                                    }
                                },
                                {
                                    text: 'Done',
                                    handler: function (blah) {
                                        _this.navCtrl.navigateRoot('/login');
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
    RegisterPage.prototype.onSubmit = function (values) {
        var _this = this;
        this.loading.present();
        // console.log(values);
        this.signup_btn = 'Please wait...';
        if (this.validations_form.valid) {
            this.http.post(this.env.API_URL + 'hero/mail/check', { email: values.email })
                .subscribe(function (data) {
                _this.authService.register(values.first_name, values.middle_name, values.last_name, values.street, values.barangay.brgyDesc, values.city.citymunDesc, values.province.provDesc, values.country, values.zip, values.birthmonth, values.birthday, values.birthyear, values.gender, values.country_phone.phone, values.email, values.matching_passwords.password, values.matching_passwords.confirm_password).subscribe(function (data) {
                    var response = data;
                    _this.authService.log(response.data.hero.id, 'registered', 'New account created');
                    _this.loading.dismiss();
                    _this.notifyRegistrationSuccess(values.email, values.matching_passwords.password);
                }, function (error) {
                    _this.signup_btn = 'Try Again';
                    _this.loading.dismiss();
                    _this.alertService.presentToast('Email already exist.');
                    console.log(error);
                    _this.authService.http_error(error);
                }, function () {
                });
            }, function (error) {
                _this.notifyEmailExist();
                _this.loading.dismiss();
                _this.signup_btn = 'CREATE ACCOUNT';
                _this.authService.http_error(error);
            });
        }
        else {
            var message = 'Input all required fields. ';
            for (var key in this.validation_messages) {
                var validations = this.validation_messages[key];
                for (var index in validations) {
                    var validation = validations[index];
                    if (this.validations_form.get(key) != null) {
                        if (this.validations_form.get(key).hasError(validation.type)) {
                            message += validation.message + ' ';
                        }
                    }
                    else {
                        message += validation.message + ' ';
                    }
                }
            }
            this.loading.dismiss();
            this.alertService.presentToast(message);
        }
    };
    RegisterPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var eightenyearsAgo = function (sp) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //As January is 0.
            var yyyy = today.getFullYear() - 18;
            if (dd < 10)
                dd = '0' + dd;
            if (mm < 10)
                mm = '0' + mm;
            return (yyyy + sp + mm + sp + dd);
        };
        this.eightenyearsAgo = eightenyearsAgo('-');
        this.authService.getToken().then(function () {
            if (_this.authService.isLoggedIn) {
                _this.navCtrl.navigateRoot('/tabs/home');
            }
        });
    };
    RegisterPage.prototype.terms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TermPage,
                            componentProps: {
                                user: {}
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            var response = data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RegisterPage.prototype.privacy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: PrivacyPage,
                            componentProps: {
                                user: {}
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            var response = data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RegisterPage = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ModalController,
            AuthService,
            NavController,
            AlertService,
            Storage,
            LoadingService,
            EnvService,
            FormBuilder,
            OrderPipe,
            AlertController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map