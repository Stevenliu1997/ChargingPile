import {Component, Input,OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";

@Component({
    selector: 'owner-choose',
    templateUrl: './owner-choose.component.html'
})
export class OwnerChooseComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    queryModel: any = {
    };

    config: object = {
        url: 'IcCard/Find',
        column: [
            {name: '用户ID', key: 'account'},
            {name: '用户名称', key: 'name'},
            {name: '角色名称', key: 'rolename'},
            {name: '手机号', key: 'phone'},
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }
}
