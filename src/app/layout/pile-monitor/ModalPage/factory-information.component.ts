import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';

@Component({
    selector: 'app-factory-information',
    templateUrl: './factory-information.component.html'
})
export class FactoryInformationComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        key: 'none',
        url: 'none/none',
        column: [
            {name: '厂商名', key: 'none'},
            {name: '厂商地址', key: 'none'},
            {name: '联系人', key: 'none'},
            {name: '电话', key: 'none'},
            {name: '更新时间', key: 'none'}
        ],
        params: function () {
        }.bind(this),
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    constructor(
        public activeModal: NgbActiveModal,
    ) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
