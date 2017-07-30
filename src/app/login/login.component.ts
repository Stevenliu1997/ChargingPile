import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    user: any = {};
    account: string;
    pwd: string;

    constructor(public router: Router, private loginService: LoginService, private httpClient: HttpClient) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        console.log(this.user);
        this.loginService.login(this.user).subscribe(response => {
            if (response.result === 'OK') {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigateByUrl('/dashboard');
            }else {
                console.log(response);
                alert(response.errorMessage);
                alert(response.message);
            }
        })

    }

}
