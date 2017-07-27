import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomHttpClient} from "./custom-http-client/CustomHttpClient";
import {CustomInterceptor} from "app/shared/intercetor/CustomInterceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmConfirComponent} from "./confirm-service/confirm-confir.component";
import {ConfirmService} from "./confirm-service/confirm.service";
import {CRUDService} from "./crud-service/crud.service";
/**
 * Created by thundersoft on 2017/7/24.
 */
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule
    ],
    exports: [],
    declarations: [ConfirmConfirComponent],
    providers: [
        CustomHttpClient,
        ConfirmService,
        CRUDService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        }
    ],
    entryComponents: [ConfirmConfirComponent]
})
export class ToolModule { }
