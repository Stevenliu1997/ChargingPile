import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from "../../../shared/components/widget/datagrid/datagrid.component";

@Component({
    selector: 'app-alert-information',
    templateUrl: './alert-information.component.html'
})
export class AlertInformationComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        key: 'pileid',
        url: 'sitemonitor/geterrorinfo',
        column: [
            {name: '充电桩ID', key: 'pileid'},
            {name: '充电枪ID', key: 'gunid'},
            {name: '故障代码', key: 'errorcode'},
            {name: '故障处理状态', key: 'state'},
            {name: '故障等级', key: 'level'},
            {name: '故障发生时间', key: 'starttime'},
            {name: '故障回复时间', key: 'endtime'}
        ],
        params: function () {
            return this.editModel;
        }.bind(this),
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
