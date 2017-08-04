/**
 * Created by thundersoft on 2017/7/24.
 */

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {ToastsManager} from "ng2-toastr";

/**
 * 第一级的拦截器，所有http请求都会通过
 */
@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(public toastr: ToastsManager){
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let nextOb = next.handle(req);
        // nextOb.subscribe((response: any) => {
        //     console.log(response);
        //
        //     //错误信息拦截
        //     if(response.body && response.body.code != '00'){
        //         this.toastr.clearAllToasts();
        //         this.toastr.error(response.body.message);
        //     }else {
        //         if(response.url && response.url.indexOf('Add') != -1){
        //             this.toastr.clearAllToasts();
        //             this.toastr.success('操作成功！');
        //         }
        //     }
        // });
        return next.handle(req);
    }
}
