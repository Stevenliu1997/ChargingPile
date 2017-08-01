import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        //现在不要前端挡板，后端做挡板
        if(1==1)
            return true;

        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
