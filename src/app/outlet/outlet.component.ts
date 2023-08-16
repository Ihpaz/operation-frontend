import { Component, OnInit } from '@angular/core';
import { OutletModalComponent } from './modal/outlet-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { DynamicService } from 'app/services/dynamic.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsOutlet',
    headers: ['No','Outlet Type', 'Area Manager', 'Regional Manager','Code Outlet','Outlet Name','District Area','Ownership','Outlet Status','Address',''],
    requestOptions: {
      path: 'Api/v1/Outlets/datatable',
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
      private _dynamicService: DynamicService,
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
    this._globalService.eventPublish('loadTableSAM:MsOutlet', true);
  }

  addOutlet() {
    const dialogRef = this._dialog.open(OutletModalComponent, {
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
        this._globalService.eventPublish('loadTableSAM:MsOutlet', true);
      }
    });
  }

  async editOutlet(id) {
    const data= await this.getOutletDetail(id)
    data['EmpList']=data.employee;
    data['EmpIDList']=[]

    for(const dt of data.employee){
      data['EmpIDList'].push(dt.EmpID)
    }


    const dialogRef = this._dialog.open(OutletModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success edit outlet');
        this._globalService.eventPublish('loadTableSAM:MsOutlet', true);
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

        this._globalService.eventPublish('loadTableSAM:MsOutlet', true);

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
        `api/v1/Outlets/detail/${id}`,
         
      );

      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async getData() {
    try {
       this._dynamicService.showLoader();
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/Outlets/importRawData`,
         
      );

      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }

  }

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/Outlets/download-excel' , [], []);
      console.log(req);
      window.location.href = req;
    } catch (error) {
      
    }
  }

}
