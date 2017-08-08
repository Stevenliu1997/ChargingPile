import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AddRuleComponent} from './add-rule.component';
import {ToastsManager} from 'ng2-toastr';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';


@Component({
    selector: 'app-charging-rule-add',
    templateUrl: './charging-rule-add.component.html'
})
export class ChargingRuleAddComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
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
                action: function (ids) {
                    const modalRef = this.ngbModal.open(AddRuleComponent);
                    modalRef.componentInstance.actionTitle = '';
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
                    url: 'CarBrand/Delete'
                }
            }
        ]
    };

    constructor(
        public activeModal: NgbActiveModal,
        private ngbModal: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    confirm() {
        this.activeModal.close(this.editModel);
    }
    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
}
