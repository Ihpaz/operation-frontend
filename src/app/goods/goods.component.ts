import { Component, OnInit } from '@angular/core';
import { GoodsModalComponent } from './modal/goods-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsGoods',
    headers: ['No', 'GoodsName', 'Specification','GoodsType',,''],
    requestOptions: {
      path: 'Api/v1/Outlets-goods/Goods/datatable',
      params: [
        { key: 'GoodsName', value: null },
      ],
      paramsCanNull: true,
    },
    limit: 5,
    pageSize: [5, 15, 50],
    withAction: true,
    isSmallScreen: false,
  }

  datatable: any[] = [];
  modelFilter: {
    GoodsName: string;
  };
  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      GoodsName: ''
    };
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsGoods', true);
  }

  addGoods() {
    const dialogRef = this._dialog.open(GoodsModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: {
        RecID: null
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success save goods');
        this._globalService.eventPublish('loadTableSAM:MsGoods', true);
      }
    });
  }

  async editGoods(id) {
    const data= await this.getGoodsDetail(id);

    const dialogRef = this._dialog.open(GoodsModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success edit goods');
        this._globalService.eventPublish('loadTableSAM:MsGoods', true);
      }
    });
  }

  async deleteGoods(id) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/Outlets-goods/${id}`,
          [],
          
        );

        this._globalService.eventPublish('loadTableSAM:MsGoods', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

  async getGoodsDetail(id) {
    try {
      
      const req = await this._globalService.runRequest(
        'GET',
        `api/v1/Outlets-goods/detail/${id}`,
         
      );

      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/outlet-goods/download-excel' , [], []);
     
      window.location.href = req;
    } catch (error) {
      
    }
  }

}
