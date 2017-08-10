import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Response} from '../shared/models/Response';
import {CustomHttpClient} from '../shared/services/custom-http-client/CustomHttpClient';
/**
 * Created by leon on 17/7/23.
 */

const loginUrl: string = 'User/Login';

@Injectable()
export class LoginService {

    //登陆用户信息
    public userInfo: any = {};

    constructor(private httpClient: CustomHttpClient) {

    }
    login(user: any): Observable<any> {
        //登陆使用formData形式提交
        return this.httpClient.formPost(loginUrl, user)

    }

    /**
     * 取得登陆用户信息
     */
    getUserInfo(forceGet?: boolean): Promise<any>{
        if(this.userInfo.name && !forceGet){
            return new Promise(function (resolve, reject) {
                resolve(this.userInfo);
            }.bind(this))
        }
        return new Promise(function (resolve, reject) {
            this.httpClient.get('Userinformation').subscribe(result => {
                if(result.code === '00'){
                    this.userInfo = result.context;
                    resolve(result.context)
                }
            }, error => {
            })
        }.bind(this))
    }


}
