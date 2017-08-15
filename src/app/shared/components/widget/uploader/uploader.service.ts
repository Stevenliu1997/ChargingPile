import {Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploaderModalComponent} from "./uploader-modal.component";
/**
 * Created by thundersoft on 2017/8/14.
 */

@Injectable()
export class Uploader{
    constructor(public ngbModal: NgbModal){}

    openUploadModal(uploadConfig: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const modalRef = this.ngbModal.open(UploaderModalComponent);
            modalRef.componentInstance.uploadConfig = uploadConfig;
            modalRef.result.then(result => {
                resolve(result);
            },error => {})
        })
    }
}
