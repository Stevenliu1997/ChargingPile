import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {URLSearchParams} from '@angular/http'


@Component({
    selector: 'app-tables',
    templateUrl: './order-manage.component.html',
    styleUrls: ['./order-manage.component.scss'],
    animations: [routerTransition()]
})

export class OrderManageComponent implements OnInit {


    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;


    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'ReserveForm/Find',
        column: [
            {name: '预订单ID', key: 'reserveid'},
            {name: '创建时间', key: 'createtime'},
            {name: '创建人', key: 'user'},
            {name: '使用时间', key: 'usetime'},
            {name: '联系方式', key: 'phone'},
            {name: '站点', key: 'siteid'},
            {name: '充电桩', key: 'pileid'},
            {name: '充电枪', key: 'gunid'},
            {name: '充电状态', key: 'reservestate'},
            {name: '取消原因', key: 'reason',html: function (item) {
                return `<span>${item.reason == 'null' ? '无' : this.queryModel.reason}</span>`
            }}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    constructor( ) {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    blankinit() {
        this.queryModel.siteid = '';
        this.queryModel.reserveid = '';
        this.queryModel.startTime = '';
        this.queryModel.endTime = '';
    }

    exportGrid() {
        let options = this.queryModel;

        let params = new URLSearchParams();
        for (let key in options) {
            params.set(key, options[key])
        }
        let URL = 'ReserveForm/Export?' + params.toString();
        window.open(URL);
    }
}
