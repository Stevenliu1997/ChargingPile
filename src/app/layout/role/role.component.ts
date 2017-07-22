import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    animations: [routerTransition()]
})
export class RoleComponent implements OnInit {
    name: String = 'name';
    // datagrid 配置
    config: object = {
        url: '/Role/Find',
        column: [
            {name: 'role'}
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }
}
