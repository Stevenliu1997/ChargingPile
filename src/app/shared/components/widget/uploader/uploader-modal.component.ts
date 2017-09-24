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
        let formData = {
            desc: this.uploadModel.desc,
        };
        if(this.uploadConfig.params){
            Object.assign(formData, this.uploadConfig.params());
        }
        if(que){
            this.lastUploadItem = que;
            this.lastUploadItem.onBuildForm = form => {
                for (let i in formData){
                    if(formData[i])
                        form.append(i, formData[i]);
                }
            };

            que.upload();
        }
    }

}
