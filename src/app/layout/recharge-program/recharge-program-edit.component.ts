import {Component, Input,ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'recharge-program-edit',
    templateUrl: './recharge-program-edit.component.html'
})
export class RechargeProgramEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}
    confirm() {
        if(this.actionTitle === '更新')
            this.updateProgram(this.editModel);
        else
            this.uploadProgram(this.editModel);
    }

    updateProgram(program: any){
        this.customHttpClient.post('Program/Update', program).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }
    uploadProgram(program: any){
        this.customHttpClient.post('Program/Upload', program).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }
}
