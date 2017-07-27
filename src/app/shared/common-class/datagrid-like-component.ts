import {DatagridComponent} from "../components/widget/datagrid/datagrid.component";
/**
 * Created by thundersoft on 2017/7/27.
 */

export class DatagridLikeComponent {
    constructor(private datagridComponent: DatagridComponent){

    }
    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }
}
