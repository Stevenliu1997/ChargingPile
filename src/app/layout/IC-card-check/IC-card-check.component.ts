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
    };
    // datagrid 配置
    config: object = {
        url: 'IcCard/Find',
        column: [
            {name: '持有用户', key: 'cardid'},
            {name: '手机号', key: 'owener'},
            {name: '地址', key: 'balance'},
            {name: '期望日期', key: 'ictype'},
            {name: '申请状态', key: 'icstate'},
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'agree',
                name: '同意',
                action: function (ids) {
                }.bind(this)
            },
            {
                type: 'disagree',
                name: '拒绝',
                action: function (ids) {
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

    addCard(Equipment: object){
        this.customHttpClient.post('IcCard/Add', Equipment).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        })
    }

    updateCard(Equipment: object){
        this.customHttpClient.post('IcCard/Update', Equipment).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
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
