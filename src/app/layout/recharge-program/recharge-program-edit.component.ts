import {Component, Input} from '@angular/core';
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

    /*    @ViewChild('submitForm')
        editForm: NgForm;*/

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {
        this.updateProgram(this.editModel);
    }

    updateProgram(program: object){
        this.customHttpClient.post('Program/Upload', program).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }
}
