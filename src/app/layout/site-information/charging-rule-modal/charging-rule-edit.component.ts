import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AddRuleComponent} from './add-rule.component';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';

@Component({
    selector: 'app-charging-rule-edit',
    templateUrl: './charging-rule-edit.component.html'
})
export class ChargingRuleEditComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        url: 'RuleDetails/Find',
        column: [
            {name: '服务费', key: 'servicecharge'},
            {name: '电价', key: 'price'},
            {name: '开始时间', key: 'starttime'},
            {name: '结束时间', key: 'endtime'}
        ],
        params: function () {
            const tempquery = {
                ruleid: 0,
            };
            tempquery.ruleid = this.editModel.ruleid;
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '增加规则',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(AddRuleComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.componentInstance.editModel.ruleid = this.editModel.ruleid;
                    modalRef.result.then(result => {
                        this.refreshGrid();
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
                    url: 'RuleDetails/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'RuleDetails/Delete'
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
    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
}
