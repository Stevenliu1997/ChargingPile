import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {OwnerChooseComponent} from "./owner-choose.component"

@Component({
    selector: 'IC-card-manage-edit',
    templateUrl: './IC-card-manage-edit.component.html'
})
export class ICCardManageEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal,private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

    /*makecard(){
        this.customHttpClient.post('')
    }*/

    openModal(){
        const modalRef = this.ngbModal.open(OwnerChooseComponent, {size: "lg"});
        modalRef.componentInstance.actionTitle = '';
        modalRef.result.then(result => {
                this.editModel.owener=result.name;
            },
            error => {
            })
    }
}
