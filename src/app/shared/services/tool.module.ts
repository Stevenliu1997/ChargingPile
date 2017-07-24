import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomHttpClient} from "./custom-http-client/CustomHttpClient";
import {CustomInterceptor} from "app/shared/intercetor/CustomInterceptor";
/**
 * Created by thundersoft on 2017/7/24.
 */
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        CustomHttpClient,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        }
    ]
})
export class ToolModule { }
