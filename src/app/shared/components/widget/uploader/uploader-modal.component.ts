import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileUploader} from "ng2-file-upload";

@Component({
    templateUrl: 'uploader-modal.component.html'
})
export class UploaderModalComponent  implements OnInit{


    public uploader: FileUploader;

    uploadModel: any = {};
    @Input()
    uploadConfig: any;

    constructor(public activeModal: NgbActiveModal,) {
    }

    ngOnInit(): void {
        this.uploader = new FileUploader({url: this.uploadConfig.url});
    }

    confirm(que: any){
        console.log(que);
        if(que){
            que.upload();
        }
    }

}
