import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";
@Component({
    selector: 'provider-edit',
    templateUrl: './provider-edit.component.html'
})
export class ProviderEditComponent {


    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
    };
    @ViewChild('submitForm')
    editForm: NgForm;


    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {

        if(this.editForm.form.invalid){
            return;
        }
        if(this.actionTitle === '添加'){
            this.addProvider(this.editModel);
        }else {
            this.updateProvider(this.editModel);
        }
    }

    updateProvider(provider: object){
        this.customHttpClient.post('Factory/Update', provider).subscribe(result => {
            if(result.code == '00'){
                this.activeModal.close();
            }
        })
    }

    addProvider(provider: object){
        this.customHttpClient.post('Factory/Add', provider).subscribe(result => {
            if(result.code == '00'){
                this.activeModal.close();
            }
        })
    }

}
