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
            {name: 'IC卡号', key: 'cardid'},
            {name: '卡主姓名', key: 'owener'},
            {name: '余额', key: 'balance'},
            {name: '类型', key: 'ictype'},
            {name: '状态', key: 'icstate'},
            {name: '创建日期', key: 'createtime'},
            {name: '手机号', key: 'phone'},
            {name: '失效日期', key: 'endtime'},
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
