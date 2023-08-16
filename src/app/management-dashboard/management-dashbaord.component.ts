import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-managemnet-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.css']
})
export class ManagementDashboardComponent implements OnInit {





  datatable: any[] = [];
  modelFilter: {
    Tittle: string;
  };
  
  modelFilterByMonth: {
    StartDate: Date;
    EndDate: Date;
    OutletName: string;
    Am:string;
  };

  StartDate:Date=new Date('2023-01-01');
  EndDate:Date=new Date();
  OutletName:string="";

  listOutlet:string[]=[];
  listAm:string[]=[];

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

  async ngOnInit() {
      this.modelFilter = {
        Tittle: ''
      };

      this.modelFilterByMonth = {
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        OutletName: this.OutletName,
        Am:""
      }

      await this.getOutlet();
      await this.getAm();
  }


  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsClosing', true);
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
        await this._globalService.eventPublish('loadTable:MsClosing', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

  
  async getOutlet() {
    try {
      
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/Outlets/outletlist`,
         
      );

      this.listOutlet=req;
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async getAm() {
    try {
      
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/Outlets/am`,
         
      );
      
      console.log(req);
      this.listAm=req;
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }
 
}
