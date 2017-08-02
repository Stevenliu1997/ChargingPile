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
        let nextOb = next.handle(req);
        // nextOb.subscribe((response: any) => {
        //     //错误信息拦截
        //     if(response.body && response.body.code != '00'){
        //         console.debug(response.body.message);
        //     }
        // });
        return nextOb;
    }
}
