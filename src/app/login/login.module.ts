import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {ToolModule} from "../shared/services/tool.module";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ToolModule
    ],
    declarations: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule {
}
