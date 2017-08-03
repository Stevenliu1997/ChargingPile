/**
 * Created by thundersoft on 2017/7/24.
 */

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

/**
 * 第一级的拦截器，所有http请求都会通过
 */
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }
}
