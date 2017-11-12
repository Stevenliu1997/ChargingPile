import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarBrandIntroComponent} from './car-brand-detail-modal/car-brand-intro.component'
import {FileUploader} from "ng2-file-upload";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-car-brand-detail',
    templateUrl: './car-brand-detail.component.html'
})
export class CarBrandDetailComponent implements OnInit{
    ngOnInit(): void {
        this.uploader = new FileUploader({url: '/Picture/Upload', autoUpload: false});
        this.uploader.onAfterAddingFile = (fileItem) => {
            this.imgSrc  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
            fileItem.onBuildForm = form => {
                form.append('brandid', this.editModel.brandid)
            };
            fileItem.upload();
        }
        this.uploader.onSuccessItem = (fileItem) => {
            this.toastr.success('上传成功');
        }
        this.uploader.onErrorItem = (fileItem) => {
            this.toastr.error('上传失败');
        }
        this.imgSrc = this.editModel.logpath;
    }

    public uploader: FileUploader;
    public imgSrc: SafeUrl;

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal,private ngbModal: NgbModal,private sanitizer: DomSanitizer, public toastr: ToastsManager) {

    }

    confirm() {
        this.activeModal.close();
    }

    edit(){
        const modalRef = this.ngbModal.open(CarBrandIntroComponent);
        modalRef.componentInstance.editModel = Object.assign({},this.editModel);
        modalRef.result.then(result => {
        }, error => {})
    }
    upload(){
    const modalRef = this.ngbModal.open(CarBrandDetailComponent,{size: "lg"});
    modalRef.componentInstance.actionTitle = '车辆';
    modalRef.componentInstance.editModel = Object.assign({});
    modalRef.result.then(result => {
    }, error => {})
    }

}
