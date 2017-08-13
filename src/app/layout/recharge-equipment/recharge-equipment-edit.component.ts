import {Component, Input,ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'recharge-equipment-edit',
    templateUrl: './recharge-equipment-edit.component.html'
})
export class RechargeEquipmentEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
        powertype: "",
        interfacetype: ""
    };
    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {
        if(this.editForm.form.invalid){
            return;
        }
        if(this.actionTitle === '新增'){
            this.addEquipment(this.editModel);
        }else {
            this.updateEquipment(this.editModel);
        }
    }
    addEquipment(Equipment: object){
        this.customHttpClient.post('Pile/Add', Equipment).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }
    updateEquipment(Equipment: object){
        this.customHttpClient.post('Pile/Update', Equipment).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        })
    }


}
