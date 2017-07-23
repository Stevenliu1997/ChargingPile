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
            {name: '角色名称', key: 'name'},
            {name: '角色权限', key: 'auth'},
            {name: '角色描述', key: 'desc'}
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }
}
