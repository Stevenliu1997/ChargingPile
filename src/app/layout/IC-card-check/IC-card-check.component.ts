import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {ICCardCheckEditComponent} from "./IC-card-check-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

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
            {name: '申请状态', key: 'status'},
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'agree',
                name: '同意',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ICCardCheckEditComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.result.then(result => {
                        this.agree(result);
                    },error =>{})
                }.bind(this)
            },
            {
                type: 'disagree',
                name: '拒绝',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ICCardCheckEditComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.result.then(result => {
                        this.disagree(result);
                    },error =>{})
                }.bind(this)
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ICCardCheckEditComponent);
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

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

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
