import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './operation-record.component.html'
})
export class OperationRecordComponent {

    @Input()
    userId: string;
    @Input()
    editModel: any = {};
    config: object = {
        key: '',
        url: '',
        column: [
            {name: '申请ID', key: 'account'},
            {name: '状态', key: 'name'},
            {name: '说明', key: 'rolename'},
            {name: '修改人', key: 'email'},
            {name: '修改时间', key: 'phone'},
        ],
        params: function () {
            return this.editModel;
        }.bind(this)
    };
    constructor(public activeModal: NgbActiveModal) {}

}
