import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {ICCardCheckEditComponent} from "./IC-card-check-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ConfirmService} from "../../shared/services/confirm-service/confirm.service";

@Component({
    selector: 'app-tables',
    templateUrl: './IC-card-check.component.html',
    styleUrls: ['./IC-card-check.component.scss'],
    animations: [routerTransition()]
})
export class ICCardCheckComponent implements OnInit {

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {
        status: ''
    };
    // datagrid 配置
    config: object = {
        url: 'IcCard-check/Find',
        column: [
            {name: '持有用户', key: 'owener'},
            {name: '手机号', key: 'phone'},
            {name: '地址', key: 'position'},
            {name: '期望日期', key: 'hopedate'},
            {name: '申请状态', key: 'status', html: function (item) {
                return `<span>${item.status == '1' ? '审核通过' : '待审核'}<i class="fa ${item.status === '1' ? 'fa-credit-card' : ''}" aria-hidden="true"></i></span>`
            }, action: function (item) {
                if(item.status === '1')
                    console.log(item);
            }},
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'agree',
                name: '同意',
                action: function (ids) {
                    // const modalRef = this.ngbModal.open(ICCardCheckEditComponent);
                    // modalRef.componentInstance.actionTitle = '';
                    // modalRef.result.then(result => {
                    //     this.agree(result);
                    // },error =>{})
                    this.confirmService.confirm('你确认通过吗？',{subMsg:'通过后即可制卡！'}).then(result => {
                        this.agree(result);
                    }, error =>{})

                }.bind(this)
            },
            {
                type: 'disagree',
                name: '拒绝',
                action: function (ids) {
                    this.confirmService.confirm('拒绝通过！',{subMsg:'请输入你拒绝通过的理由：', inputInfo: true}).then(result => {
                        this.disagree(result);
                    }, error =>{})
                }.bind(this)
            }
        ],
        rowActions: [
            {
                //todo 打印下载
            }
        ]
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient, private confirmService: ConfirmService) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    //根据后端接口看ICcard是否为boolean
    agree(ICcard: object){
        this.customHttpClient.post('', ICcard).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        })
    }
    disagree(ICcard: object){
        this.customHttpClient.post('', ICcard).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        })
    }

    clear(){
        this.queryModel.status='';
    }

}
