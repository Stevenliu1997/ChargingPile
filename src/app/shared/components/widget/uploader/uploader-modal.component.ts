import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileItem, FileUploader} from "ng2-file-upload";

@Component({
    templateUrl: 'uploader-modal.component.html'
})
export class UploaderModalComponent  implements OnInit{


    public uploader: FileUploader;

    uploadModel: any = {};
    @Input()
    uploadConfig: any;

    lastUploadItem: FileItem;

    constructor(public activeModal: NgbActiveModal,) {
    }

    ngOnInit(): void {
        this.uploader = new FileUploader({url: this.uploadConfig.url});
    }

    confirm(que: FileItem){
        console.log(que);
        if(que){
            this.lastUploadItem = que;
            que.formData = {
                desc: this.uploadModel.desc
            };
            que.upload();
        }
    }

}
