import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {


  tblSchema: any =  {
    name: "MsReceiving",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/receiving/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "Q1",
        title: "Timestamp",
        width: 150,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q2",
        title: "Nama outlet",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q4",
        title: "Employee ID",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q5",
        title: "Apakah Hari ini ada kedatangan barang",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q6",
        title: "6",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q7",
        title: "Foto Surat jalan",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q8",
        title: "Jenis Item BBQ, TOPPER, SIDE DISH yang (SESUAI STANDARD)",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q9",
        title: "Jenis Item BBQ, TOPPER, SIDE DISH yang (TIDAK SESUAI STANDARD)",
        width: 0,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      }
     
    ],
    fieldActions: [
   
    ],
    forMobile: {
      leftField: {
        title: "Q1",
        subtitle: "Q2",
        miniSubtitle: null
      },
      rightField: {
        title: "Q3",
        subtitle: null,
        miniSubtitle: null
      },
      height: "100vh",
      useAction: true,
      withBackground: true,
      actions: [
    
      ]
    }
  }


  datatable: any[] = [];
  modelFilter: {
    Tittle: string;
  };
  
  onUpload: boolean = false;
  acceptExt: string = ".xlsx,xlx";
  url: string = '';
  Attachment:string='';
  AttachmentUrl:string='';
  NewAttachment:string='';

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
    this._globalService.eventPublish('loadTableSAM:MsReceiving', true);
  }

  goToDetail(){
    this._globalService.redirectPage(`receiving/detail`, [], true);
  }

  goToDetailWithId(id:number){
    this._globalService.redirectPage(`receiving/detail`, [{key:'id',value:id}], true);
  }


  async callbackActionHandler(action: any) {
    try {

        if(action.action =='delete'){
          await this.deleteForm(action.value);
        }else if(action.action =='detail'){
            this.goToDetailWithId(action.value.id)
        }
          

    } catch (error) {
        // this._globalService.showSnackBar(error.message);
        this._globalService.showNotif(error.message);
    } finally {
        this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async deleteForm(action) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/receiving/remove/${action.id}`,
          [],
          
        );

        this._globalService.showNotif('Success delete receiving!');
        await this._globalService.eventPublish('loadTable:MsReceiving', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

 
}
