import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    formObj: any = {};
    name: string = '表格';
    constructor(private httpClient: HttpClient) { }
    ngOnInit() {}
    submit() {
        console.log(this.formObj.name);
        this.httpClient.post("forms/add", this.formObj).subscribe(response => {
            console.log(response);
        }, error => {

        })
    }
}
