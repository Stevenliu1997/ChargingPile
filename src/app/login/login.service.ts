import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Response} from "../shared/models/Response";
/**
 * Created by leon on 17/7/23.
 */

const loginUrl: string = 'assets/demo/'+'User/Login.json';

@Injectable()
export class LoginService {

    constructor(private httpClient: HttpClient){

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
