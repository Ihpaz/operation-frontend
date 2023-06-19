import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsForm',
    headers: ['No','Title', 'Remarks', 'Status',''],
    requestOptions: {
      path: 'Api/v1/form/datatable',
      params: [
        { key: 'Tittle', value: null }
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
    Tittle: string;
  };
  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      Tittle: ''
    };
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsForm', true);
  }

  goToDetail(){
    this._globalService.redirectPage(`form/detail`, [], true);
  }

  goToDetailWithId(id:number){
    this._globalService.redirectPage(`form/detail`, [{key:'id',value:id}], true);
  }


  // addOutlet() {
  //   const dialogRef = this._dialog.open(OutletModalComponent, {
  //     width: '500px',
  //     disableClose: true,
  //     autoFocus: false,
  //     data: {
  //       RecID: null
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this._globalService.showNotif('Success save outlet');
  //       this._globalService.eventPublish('loadTableSAM:MsForm', true);
  //     }
  //   });
  // }

  // async editOutlet(id) {
  //   const data= await this.getOutletDetail(id)
  //   data['EmpList']=data.employee;
  //   data['EmpIDList']=[]

  //   for(const dt of data.employee){
  //     data['EmpIDList'].push(dt.EmpID)
  //   }

  //   console.log(data,'idlist')

  //   const dialogRef = this._dialog.open(OutletModalComponent, {
  //     width: '500px',
  //     disableClose: true,
  //     autoFocus: false,
  //     data: data,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this._globalService.showNotif('Success edit outlet');
  //       this._globalService.eventPublish('loadTableSAM:MsForm', true);
  //     }
  //   });
  // }

  async deleteForm(id) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/form/${id}`,
          [],
          
        );

        this._globalService.eventPublish('loadTableSAM:MsForm', true);

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

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/Outlets/download-excel' , [], []);
      window.location.href = req;

    } catch (error) {
      
    }
  }

}
