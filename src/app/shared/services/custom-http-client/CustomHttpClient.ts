import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
/**
 * Created by thundersoft on 2017/7/24.
 */
@Injectable()
export class CustomHttpClient extends HttpClient{

    environment: any = environment;

    post(url: string, body?: any | any, options?): Observable<any> {
        url = this.modifyUrl(url);
        options = this.convertUrlParams(options);
        //TODO 模拟数据post会报404，暂时时候get
        if(this.environment.developMode === 'demo'){
            console.debug('----------------params');
            console.debug(body);
            return super.get(url, options);
        }

        return super.post(url, body, options);
    }

    formPost(url: string, params?: any, options?: any): Observable<any>{
        url = this.modifyUrl(url);
        options = !options ? {} : options;
        //转换参数
        let urlSearchParams = new URLSearchParams();
        for(let i in params){
            urlSearchParams.append(i, params[i]);
        }
        let body = urlSearchParams.toString();

        //修改headers
        options = Object.assign(options,{
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        }) ;

        //TODO 模拟数据post会报404，暂时时候get
        if(this.environment.developMode === 'demo')
            return super.get(url, options);
        return super.post(url, body, options)
    }


    delete(url: string, options?): Observable<any> {
        url = this.modifyUrl(url);
        return super.delete(url, options);
    }

    get(url: string, options?): Observable<any> {
        url = this.modifyUrl(url);
        options = this.convertUrlParams(options);
        return super.get(url, options);
    }

    put(url: string, body: any | any, options?): Observable<any> {
        url = this.modifyUrl(url);
        return super.put(url, body, options);
    }

    modifyUrl(url: string): string{
        //检查模式
        if(this.environment.developMode === 'demo'){
            url = url + '.json';
        }
        if(this.environment.host){
            url = this.environment.host + url;
        }else {
            url = `${window.location.origin}/${url}`;
        }
        return url;
    }

    convertUrlParams(options: any): object {
        if(!options || !options.httpParams){
            return options;
        }
        // options = options.clone();
        let httpParams = new HttpParams();
        let params = options.httpParams;
        for(let i in params){
            httpParams = httpParams.set(i, params[i]);
        }
        delete options.httpParams;
        options.params = httpParams;
        return options;
    }

}
