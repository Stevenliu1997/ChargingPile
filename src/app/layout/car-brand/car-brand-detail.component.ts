import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarBrandIntroComponent} from './car-brand-detail-modal/car-brand-intro.component'

@Component({
    selector: 'app-car-brand-detail',
    templateUrl: './car-brand-detail.component.html'
})
export class CarBrandDetailComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal,private ngbModal: NgbModal,) {}

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
