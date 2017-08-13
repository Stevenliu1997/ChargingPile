import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';

import {AddRuleComponent} from './add-rule.component';

@Component({
    selector: 'app-charging-rule-edit',
    templateUrl: './charging-rule-edit.component.html'
})
export class ChargingRuleEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        url: 'SiteInformation/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '增加规则',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(AddRuleComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.result.then(result => {
                        this.update(result);
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url: 'CarBrand/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'delete',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'CarBrand/Delete'
                }
            }
        ]
    };

    constructor(
        public activeModal: NgbActiveModal,
        public ngbModal: NgbModal
        ) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
