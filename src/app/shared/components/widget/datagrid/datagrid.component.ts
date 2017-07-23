import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../../models/User";

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {

    @Input()
    config: any;
    displayData: User = new User();

    fetchedData: any;

    constructor(private httpClient: HttpClient) {

    }

    ngOnInit() {
        console.log(this.config);
        this.loadData();
    }

    public loadData(): void{
        this.httpClient.get('./assets/demo'+this.config.url+'.json',{
            params: new HttpParams().set('name', '1')
        }).subscribe(value => {
            console.log(value);
            this.displayData.name = 'test';
            console.log(this.displayData.name);

            this.fetchedData = value;
            this.fetchedData.message = 'this is ok';
        })
    }

}
