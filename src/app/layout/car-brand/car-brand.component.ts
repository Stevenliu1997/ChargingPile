import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";

@Component({
    selector: 'app-tables',
    templateUrl: './car-brand.component.html',
    styleUrls: ['./car-brand.component.scss'],
    animations: [routerTransition()]
})
export class CarBrandComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'Role/Find',
        column: [
            {name: '角色名称', key: 'name'},
            {name: '角色权限', key: 'auth'},
            {name: '角色描述', key: 'desc'}
        ],
        params: (function (thisObj) {
            return function () {
                return thisObj.queryModel;
            }
        })(this)
    };

    constructor() {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }
}
