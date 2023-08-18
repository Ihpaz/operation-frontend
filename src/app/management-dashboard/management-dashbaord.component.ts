import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';
import { DynamicService } from 'app/services/dynamic.service';

@Component({
  selector: 'app-managemnet-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
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

  StartDate:Date=new Date();
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
  barChartData: { labels: any; datasets: any; };


  dtAttendanceComp  =0
  dtAttendanceQua   =0
  dtKitchenComp     =0
  dtFrontComp       =0
  dtFoodComp        =0
  dtFoodQua         =0
  dtSoupComp        =0
  dtSoupQua         =0
  dtPestComp        =0
  dtPestQua         =0
  dtSuhuComp        =0
  dtSuhuQua         =0
  dtNpsComp         =0
  dtNpsQua          =0
  dtRedBillComp     =0
  dtRedBillQua      =0
  dtCxComp          =0
  dtCxQua           =0
  dtStorageComp     =0
  dtStorageQua      =0
  dtReceivingComp   =0
  dtReceivingQua    =0
  dtClosingComp     =0
  dtClosingQua      =0

  AvgCompliance:any     =0
  AvgQuality:any        =0

  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog,
      private _dynamicService: DynamicService,
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
      await this.onFilter;
  }


  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  async onFilter() {
    await this.getDashboardGeneral()
    this.getAverage();
  }




  async callbackActionHandler(action: any) {
    try {

      
          

    } catch (error) {
        // this._globalService.showSnackBar(error.message);
        this._globalService.showNotif(error.message);
    } finally {
        this._globalService.eventPublish('global:showLoader', false);
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
      
      this.listAm=req;
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async getDashboardGeneral() {
    try {
      this._dynamicService.showLoader();
      let url='Api/v1/general/management-dashboard';
      const req= await this._globalService.runRequest(
         'POST',
          url,
         [],
         [
          {key:'StartDate',value:this.modelFilterByMonth.StartDate},
          {key:'EndDate',value:this.modelFilterByMonth.EndDate},
          {key:'OutletName',value:this.modelFilterByMonth.OutletName},
          {key:'Am',value:this.modelFilterByMonth.Am}
         ]
       );

        this.dtAttendanceComp =this.sumValue(req.data.dtAttendanceComp.data[0].data);
        this.dtAttendanceQua= this.sumValue(req.data.dtAttendanceQua.data[0].data);

        this.dtKitchenComp= this.sumValue(req.data.dtKitchenComp.data[0].data);
        this.dtFrontComp= this.sumValue(req.data.dtFrontComp.data[0].data);

        this.dtFoodComp= this.sumValue(req.data.dtFoodComp.data[0].data);
        this.dtFoodQua= this.sumValue(req.data.dtFoodQua.data[0].data);

        this.dtFoodComp= this.sumValue(req.data.dtFoodComp.data[0].data);
        this.dtFoodQua= this.sumValue(req.data.dtFoodQua.data[0].data);

        this.dtSoupComp= this.sumValue(req.data.dtSoupComp.data[0].data);
        this.dtSoupQua= this.sumValue(req.data.dtSoupQua.data[0].data);

        this.dtPestComp= this.sumValue(req.data.dtPestComp.data[0].data);
        this.dtPestQua= this.sumValue(req.data.dtPestQua.data[0].data);
         
        this.dtSuhuComp= this.sumValue(req.data.dtSuhuComp.data[0].data);
        this.dtSuhuQua= this.sumValue(req.data.dtSuhuQua.data[0].data);

        this.dtNpsComp= this.sumValue(req.data.dtNpsComp.data[0].data);
        this.dtNpsQua= this.sumValue(req.data.dtNpsQua.data[0].data);

        
        this.dtRedBillComp= this.sumValue(req.data.dtRedBillComp.data[0].data);
        this.dtRedBillQua= this.sumValue(req.data.dtRedBillQua.data[0].data,false);

        this.dtCxComp= this.sumValue(req.data.dtCxComp.data[0].data);
        this.dtCxQua= this.sumValue(req.data.dtCxQua.data[0].data);

        this.dtStorageComp= this.sumValue(req.data.dtStorageComp.data[0].data);
        this.dtStorageQua= this.sumValue(req.data.dtStorageQua.data[0].data);

        this.dtReceivingComp= this.sumValue(req.data.dtReceivingComp.data[0].data);
        this.dtReceivingQua= this.sumValue(req.data.dtReceivingQua.data[0].data);

        this.dtClosingComp= this.sumValue(req.data.dtClosingComp.data[0].data);
        this.dtClosingQua=await this.sumValue(req.data.dtClosingQua.data[0].data);


         
     
      return true;
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }
  }

  sumValue(value:any,isDivided:boolean=true){
    let Nilai=0;
      console.log(value)

    let i=0;
    for(const dt of value){
        Nilai=Nilai + parseFloat(dt);
        i++;
    }

    if(isDivided)  Nilai=Nilai/i;
   

    return Nilai;
  }

  
  async getData() {
    try {
       this._dynamicService.showLoader();
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/general/importRawData`,
         
      );
      
      this.getDashboardGeneral();
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async getAverage(){
   this.AvgCompliance=((
      this.dtAttendanceComp+
      this.dtKitchenComp+
      this.dtFrontComp+
      this.dtFoodComp+
      this.dtSoupComp+
      this.dtPestComp+
      this.dtSuhuComp+
      this.dtRedBillComp+
      this.dtCxComp+
      this.dtStorageComp+
      this.dtReceivingComp+
      this.dtClosingComp)/12).toFixed(2);

      this.AvgQuality=((
        this.dtAttendanceQua+
        this.dtFoodQua+
        this.dtSoupQua+
        this.dtPestQua+
        this.dtSuhuQua+
        this.dtCxQua+
        this.dtStorageQua+
        this.dtReceivingQua+
        this.dtClosingQua)/9).toFixed(2);
    }
    
  
 
}
