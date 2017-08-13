import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {ICCardManageEditComponent} from "./IC-card-manage-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ConfirmService} from "../../shared/services/confirm-service/confirm.service";

@Component({
    selector: 'app-tables',
    templateUrl: './IC-card-manage.component.html',
    styleUrls: ['./IC-card-manage.component.scss'],
    animations: [routerTransition()]
})
export class ICCardManageComponent implements OnInit {

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {
        owener: '',
        balance: '',
        phone: '',
        ictype: '',
        createtime: '',
        endtime: '',
        cardid: '',
        icstate: ''
    };
    // datagrid 配置
    config: object = {
        key: 'cardid',
        url: 'IcCard/Find',
        column: [
            {name: 'IC卡号', key: 'cardid'},
            {name: '卡主姓名', key: 'owener'},
            {name: '余额', key: 'balance'},
            {name: '类型', key: 'ictype'}, //todo 表内状态
            {name: '状态', key: 'icstate'},
            {name: '创建日期', key: 'createtime'},
            {name: '手机号', key: 'phone'},
            {name: '失效日期', key: 'endtime'},
        ],
        params: function () {
            let queryModel =  Object.assign({},this.queryModel);
            if (queryModel.cardid == ''){
                queryModel.cardid = -1;
            }
            if (queryModel.icstate == 1){
                this.queryModel.icstate = "正常";
            }else{
                queryModel.icstate = "锁定";
            }
            return queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ICCardManageEditComponent);
                    modalRef.componentInstance.actionTitle = '新增';
                    modalRef.result.then(result => {
                        this.addCard(result);
                    },error => {
                    })
                }.bind(this)
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ICCardManageEditComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateCard(result);
                    },error => {
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                },
                autoConfig: {
                    url:'IcCard/Delete'
                }
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

    addCard(Equipment: object){
        this.customHttpClient.post('IcCard/Add', Equipment).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        },error =>{
        })
    }

    updateCard(Equipment: object){
        this.customHttpClient.post('IcCard/Update', Equipment).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        },error =>{
        })
    }

    clear(){
        this.queryModel.owener= '';
        this.queryModel.balance= '';
        this.queryModel.phone= '';
        this.queryModel.ictype= '';
        this.queryModel.createtime= '';
        this.queryModel.endtime= '';
        this.queryModel.cardid= '';
        this.queryModel.icstate= '';
    }

}
