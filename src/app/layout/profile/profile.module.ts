import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {FormsModule} from "@angular/forms";
import { PageHeaderModule } from '../../shared';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {ToolModule} from "../../shared/services/tool.module";
import {ProfileEditpasswordComponent} from './profile-editpassword.component';
import {ProfileEditProfileComponent} from './profile-editProfile.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../login/login.service";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FormsModule,
        ToolModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        ProfileComponent,
        ProfileEditpasswordComponent,
        ProfileEditProfileComponent
    ],
    entryComponents: [
        ProfileEditpasswordComponent,
        ProfileEditProfileComponent
    ]
})
export class ProfileModule {
}
