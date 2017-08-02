import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {window} from "rxjs/operator/window";


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
        url: 'ReserveForm /Find',
        column: [
            {name: '预订单ID', key: 'reseverid'},
            {name: '创建时间', key: 'createTime'},
            {name: '创建人', key: 'user'},
            {name: '使用时间', key: 'usetime'},
            {name: '联系方式', key: 'phone'},
            {name: '站点', key: 'siteid2'},
            {name: '充电桩', key: 'siteid'},
            {name: '充电枪', key: 'gunid'},
            {name: '充电状态', key: 'reseverstate'},
            {name: '剩余时间', key: 'surplustime'},
            {name: '取消原因', key: 'reasion'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    constructor( private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    blankinit(){
        this.queryModel.rechargename='';
        this.queryModel.ordernumber='';
        this.queryModel.stime='';
        this.queryModel.etime='';
    }


    exportGrid(ids){
        this.customHttpClient.post('ReserveForm /Export',ids).subscribe(result =>{

        });
        //window.open('ReserveForm /Export');
    }
}
