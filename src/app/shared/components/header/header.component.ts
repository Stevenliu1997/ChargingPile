import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {CustomHttpClient} from "../../services/custom-http-client/CustomHttpClient"

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public router: Router, private customHttpClient: CustomHttpClient) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }


    onLoggedout() {
        this.customHttpClient.get('logout');
    }
    changeLang(language: string) {
    }
}
