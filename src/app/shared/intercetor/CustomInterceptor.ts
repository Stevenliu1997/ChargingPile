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
        let nextOb = next.handle(req).map(event => {
            this.handResponse(event);
            return event;
        });

        return nextOb;
    }

    handResponse(response: any){
        //错误信息拦截
        if(response.body && response.body.code != '00'){
            this.toastr.clearAllToasts();
            window.setTimeout(() => {
                this.toastr.error(response.body.message);
            },0);
        }else {
            if(response.url){
                let msg;
                if(response.url.indexOf('Add') != -1){
                    msg = '添加成功！';
                }else if(response.url.indexOf('Update') != -1){
                    msg = '修改成功！';
                }else if(response.url.indexOf('Delete') != -1){
                    msg = '删除成功！';
                }
                //todo 上传成功
                if(msg){
                    this.toastr.clearAllToasts();
                    window.setTimeout(() => {
                        this.toastr.success(msg);
                    },0);


                }
            }
        }
    }

}
