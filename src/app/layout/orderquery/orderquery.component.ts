import {Component, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {Router} from "@angular/router";
import {URLSearchParams} from '@angular/http'

@Component({
    selector: 'app-form',
    templateUrl: 'orderquery.component.html',
    styleUrls: ['orderquery.component.scss'],
    animations: [routerTransition()]
})
export class OrderQueryComponent implements OnInit {

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'OrderForm/Find',
        column: [
            {name: '订单号', key: 'orderid'},
            {name: '订单编号', key: 'ordernumber'},
            {name: '订单状态', key: 'orderstate'},
            {name: '充电时长', key: 'chargetime'},
            {name: '总电量', key: 'chargeamount'},
            {name: '完成时间', key: 'endchargetime'},
            {name: '支付方式', key: 'paytype'},
            {name: '用户', key: 'payer'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        rowActions: [
            {
                type: 'detail',
                name: '详情',
                action: function (item) {
                    this.router.navigate(['/orderquery/detail', item.orderid]);
                }.bind(this)
            }
        ]
    };
    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient, private router: Router) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        console.log(this.config);
        this.datagridComponent.refreshGrid();
    }

    blankGrid(){
        this.queryModel = {};

    }

    exportGrid(){
        let options = this.queryModel;
        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "OrderForm/Excel?"+params.toString();
        window.open(URL);
    }
}
