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

    constructor(private httpClient: CustomHttpClient) {

    }
    login(user: any): Observable<Response> {
        //登陆使用formData形式提交
        return this.httpClient.formPost(loginUrl, user)

    }
}
