import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Response} from "../shared/models/Response";
import {CustomHttpClient} from "../shared/services/custom-http-client/CustomHttpClient";
/**
 * Created by leon on 17/7/23.
 */

const loginUrl: string = 'User/Login';

@Injectable()
export class LoginService {

    constructor(private httpClient: CustomHttpClient){

    }
    login(user: any): Observable<Response> {
        // return this.httpClient.post(loginUrl, user);
        let params: HttpParams = new HttpParams();
        for(let i in user){
            params.set(i, user);
        }
        return this.httpClient.get(loginUrl, {
           params: params
        })

    }
}
