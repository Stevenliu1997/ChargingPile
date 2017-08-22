import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CustomHttpClient} from "../../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    templateUrl: 'orderquery-detail.component.html',
    animations: [routerTransition()]
})
export class OrderQueryDetailComponent implements OnInit {
    displayData: any = {};

    ngOnInit(): void {
        this.activeRoute.paramMap
            .switchMap((params: ParamMap) =>
                this.customHttpClient.post('OrderFormDetails/Find', {data : params.get('id')}))
            .subscribe(result => {
                if(result.code === '00'){
                    this.displayData = result.data;
                }
            });
    }


    constructor(private activeRoute: ActivatedRoute, private customHttpClient: CustomHttpClient) {
    }
}
