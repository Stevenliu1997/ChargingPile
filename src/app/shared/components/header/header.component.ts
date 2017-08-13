import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {CustomHttpClient} from "../../services/custom-http-client/CustomHttpClient"
import {LoginService} from "../../../login/login.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public router: Router, private customHttpClient: CustomHttpClient, public loginService: LoginService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        //取得用户信息
        this.loginService.getUserInfo().then(function (userInfo) {
        }.bind(this))
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
    }
    onLoggedout() {
        this.customHttpClient.get('logout').subscribe();
    }
}
