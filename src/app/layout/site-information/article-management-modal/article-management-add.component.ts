import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-article-management-add',
    templateUrl: './article-management-add.component.html'
})
export class ArticleManagementAddComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient
    ) {}

    confirm() {
        if (this.actionTitle === '添加') {
            this.add(this.editModel);
        } else if (this.actionTitle === '编辑') {
            this.update(this.editModel);
        }
    }
    add(obj: any) {
        this.customHttpClient.post('SiteInformation/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
    update(obj: any) {
        this.customHttpClient.post('SiteInformation/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
