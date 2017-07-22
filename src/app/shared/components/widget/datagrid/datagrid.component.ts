import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {

    @Input()
    config: object;
    ngOnInit() {
        console.log(this.config);
    }

}
