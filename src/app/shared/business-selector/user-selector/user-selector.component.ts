import {Component, Input, ViewChild} from "@angular/core";
import {DatagridComponent} from "app/shared/components/widget/datagrid/datagrid.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastsManager} from "ng2-toastr";
/**
 * Created by mac on 2017/7/27.
 */

@Component({
    selector: 'user-selector',
    templateUrl: './user-selector.component.html'
})
export class UserSelectorComponent {

    @Input()
    multi: boolean = false;

    constructor(public activeModal: NgbActiveModal,private toastStr: ToastsManager){}

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        key: 'account',
        url: 'ManageUser/Find',
        radioCheck:true,
        column: [
            {name: '用户ID', key: 'account'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: '手机号', key: 'phone'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [],
        rowActions: []
    };

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    confirm(){
        let selectedValue = this.datagridComponent.radioValue;
        if(!selectedValue){
            this.toastStr.clearAllToasts();
            window.setTimeout(() => {
                this.toastStr.error('请至少勾选一项');
            });
            return;
        }
        this.activeModal.close(selectedValue);
    }

}
