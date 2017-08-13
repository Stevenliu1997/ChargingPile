import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserSelectorComponent} from "./user-selector/user-selector.component";
import {BusinessSelector} from "./business-selector.service";
import {WidgetModule} from "../components/widget/widget.module";
import {FormsModule} from "@angular/forms";
/**
 * Created by thundersoft on 2017/7/24.
 */
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        WidgetModule
    ],
    declarations: [UserSelectorComponent],
    providers: [
        BusinessSelector
    ],
    entryComponents: [UserSelectorComponent]
})
export class BusinessToolModule { }
