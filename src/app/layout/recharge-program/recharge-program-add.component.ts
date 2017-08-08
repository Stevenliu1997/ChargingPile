import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'recharge-program-add',
    templateUrl: './recharge-program-add.component.html'
})

export class RechargeProgramAddComponent {

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
        this.addProgram(this.editModel);
    }

    addProgram(program: any){
        program.programid=-1;
        this.customHttpClient.post('Program/Add', program).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }

}
