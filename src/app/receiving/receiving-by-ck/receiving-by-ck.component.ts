import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';

@Component({
  selector: 'app-receiving-by-ck',
  templateUrl: './receiving-by-ck.component.html',
  styleUrls: ['./receiving-by-ck.component.css']
})
export class ReceivingByCkComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsReceivingbyCk',
    headers: ['No','Outlet Name','District Area','Status'],
    requestOptions: {
      path: 'api/v1/receiving/get-receivingbyck/datatable',
      params: [
        { key: 'ReceivingDate', value: null },
        { key: 'OutletName', value: null },
      ],
      paramsCanNull: true,
    },
    limit: 150,
    pageSize: [150],
    withAction: true,
    isSmallScreen: false,
  }

  datatable: any[] = [];
  modelFilter: {
    ReceivingDate: Date;
    OutletName: string;
  };
  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      ReceivingDate: new Date(),
      OutletName: '',
    };
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsReceivingbyCk', true);
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


  async doSave() {
    try {
     

      const req = await this._globalService.runRequest(
        'POST',
        'Api/v1/receiving/receivingbyck',
        [],
        [
        
          { key: 'ReceivingDate', value: this.modelFilter.ReceivingDate },
          { key: 'listReceiving', value: this.datatable },
         
        ]
      );
      
      
      this._globalService.showNotif('Berhasil disimpan !')
      this._globalService.eventPublish('loadTableSAM:MsReceivingbyCk', true);
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } 
  }

  async changeValueCk(val,i){
    event.preventDefault();
    event.stopPropagation();
    this.datatable[i].Value=val;
  }

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/Outlets/download-excel' , [], []);
      window.location.href = req;
    } catch (error) {
      
    }
  }

}
