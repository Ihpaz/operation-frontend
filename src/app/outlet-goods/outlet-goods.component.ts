import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { OutletGoodsModalComponent } from './modal/outlet-goods-modal.component';

@Component({
  selector: 'app-outlet-Goods',
  templateUrl: './outlet-goods.component.html',
  styleUrls: ['./outlet-goods.component.css']
})
export class OutletGoodsComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsOutletGoods',
    headers: ['No','Code Outlet','Outlet Name','District Area','Outlet Type','Outlet Status','Total Goods',''],
    requestOptions: {
      path: 'api/v1/Outlets-goods/datatable',
      params: [
        { key: 'CodeOutlet', value: null },
        { key: 'OutletName', value: null },
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
    CodeOutlet: string;
    OutletName: string;
  };
  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      CodeOutlet: '',
      OutletName: '',
    };
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsOutletGoods', true);
  }

  addOutlet() {
    const dialogRef = this._dialog.open(OutletGoodsModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: {
        RecID: null
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success save outlet');
        this._globalService.eventPublish('loadTableSAM:MsOutletGoods', true);
      }
    });
  }

  async editOutlet(id) {
    const data= await this.getOutletDetail(id)
    
    const dtAsset= data.goodsOutlet.filter(item => {
      return item.GoodsType == 'ASSET';
    });

    const dtInventory= data.goodsOutlet.filter(item => {
      return item.GoodsType == 'INVENTORY';
    });

    data['AssetList']=dtAsset;
    data['CodeAssetList']=[]

    data['InventoryList']=dtInventory;
    data['CodeInventoryList']=[]

    for(const dt of dtAsset){
      data['CodeAssetList'].push(dt.goodsId)
    }

    for(const dt of dtInventory){
      data['CodeInventoryList'].push(dt.goodsId)
    }


    const dialogRef = this._dialog.open(OutletGoodsModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success edit outlet');
        this._globalService.eventPublish('loadTableSAM:MsOutletGoods', true);
      }
    });
  }

  async deleteOutlet(id) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/Outlets/${id}`,
          [],
          
        );

        this._globalService.eventPublish('loadTableSAM:MsOutletGoods', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

  async getOutletDetail(id) {
    try {
      
      const req = await this._globalService.runRequest(
        'GET',
        `api/v1/Outlets/detailgoods/${id}`,
      );
      
      console.log(req,'req')
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/Outlets/download-excel' , [], []);
      window.location.href = req;
    } catch (error) {
      
    }
  }

}
