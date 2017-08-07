import {Injectable, Input} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmConfirComponent} from "./confirm-confir.component";

@Injectable()
export class ConfirmService {

    constructor(private ngbModal: NgbModal) {
    }

    confirm(msg: string, options?: object){
        const modalRef = this.ngbModal.open(ConfirmConfirComponent);
        modalRef.componentInstance.confirmMsg = msg;
        modalRef.componentInstance.options = options || {};
        return modalRef.result;
    }

    deleteConfirm(title?: string) {

        title = title ? `确认删除${title}?` : `确认删除?`;
        return this.confirm(title);
    }

    agreeConfirm(title?: string, options?: object) {

    }

}
