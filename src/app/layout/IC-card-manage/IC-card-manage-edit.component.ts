import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {OwnerChooseComponent} from "./owner-choose.component"
import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";
import {BusinessSelector} from "../../shared/business-selector/business-selector.service";

@Component({
    selector: 'IC-card-manage-edit',
    templateUrl: './IC-card-manage-edit.component.html'
})
export class ICCardManageEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal,private ngbModal: NgbModal, private customHttpClient: CustomHttpClient, private businessSelector: BusinessSelector) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

    openModal(){
        this.businessSelector.userSelector().then(result => {
            this.editModel.owener = result.name;
            //TODO 卡主ID字段请按照文档修改
            this.editModel.account = result.account;
        })

        // const modalRef = this.ngbModal.open(OwnerChooseComponent, {size: "lg"});
        // modalRef.result.then(result => {
        // },error => {
        // })

    }
}
