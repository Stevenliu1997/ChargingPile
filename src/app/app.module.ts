import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomInterceptor} from "./shared/intercetor/CustomInterceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {ToastConfig} from "./shared/components/toast/toast.config";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        },
        {provide: ToastOptions, useClass: ToastConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
