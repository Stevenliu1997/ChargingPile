import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'factory-settings-edit',
    templateUrl: './factory-settings-edit.component.html'
})

export class FactorySettingsEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {
        if(this.editForm.form.invalid){
            return;
        }
        this.update(this.editModel);
    }

    update(factoryset: any){
        this.customHttpClient.post('factoryset/update', factoryset).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }

}
