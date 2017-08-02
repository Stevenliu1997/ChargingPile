import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";

@Component({
    selector: 'profile-editpassword',
    templateUrl: './profile-editpassword.component.html'
})
export class ProfileEditpasswordComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    value= '';
    pwd= false;
    errormsg: string;
    newpwd= false;

    private datagridComponent: DatagridComponent;

    constructor(public activeModal: NgbActiveModal, private customHttpClient: CustomHttpClient) {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    confirm() {
        this.customHttpClient.post('',this.editModel).subscribe(result => {
            if(result.code=='00'){
                this.activeModal.close(this.editModel);
            }else{
                this.errormsg= result.message;
            }
        })
    }
    newPwd(value: string){
        this.value=value;
        if (this.value != '')
            this.newpwd= false;
        else
            this.newpwd= true;
    }

    //比较两次密码
    compare(value: string){
        this.value=value;
        if (this.value !=this.editModel.newpassword)
            this.pwd= true;
        else
            this.pwd= false;
    }
    //比较原密码 TODO
    compare2(oldpassword: object){
        this.customHttpClient.post('User/UpdatePassword', oldpassword).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        })
    }
}
