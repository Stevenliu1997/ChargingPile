import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ProfileEditProfileComponent} from "./profile-editProfile.component";
import {ProfileEditpasswordComponent} from "./profile-editpassword.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    queryModel: any = {};
    // datagrid 配置
    constructor(private ngbModal: NgbModal,public router: Router, private customHttpClient: CustomHttpClient) {
    }


    ngOnInit() {
        this.customHttpClient.get('Userinformation').subscribe(result => {
            this.queryModel = result;
        }, error => {
        })
    }

     editProfile(item) {
        const modalRef = this.ngbModal.open(ProfileEditProfileComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.componentInstance.editModel = Object.assign({},item);
        modalRef.result.then(result => {
                this.queryModel=result;
        },
        error => {
         })
    }

    editPassword(){
        const modalRef = this.ngbModal.open(ProfileEditpasswordComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.result.then(result => {
        }, error => {
        })
    }
}
