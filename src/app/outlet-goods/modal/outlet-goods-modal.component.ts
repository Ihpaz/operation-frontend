import { Component, Inject, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import * as moment from 'moment';




export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD MMM YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
  
  @Component({
    selector: 'app-outlet-goods-modal',
    templateUrl: './outlet-goods-modal.component.html',
    styleUrls: ['./outlet-goods-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class OutletGoodsModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';

    acceptExt: string = ".xlsx,xlx";
    url: string = '';
    Attachment:string='';
    AttachmentUrl:string='';
    NewAttachment:string='';
    onUpload: boolean = false;
  
    modelData: {
      id:number;
      Am: string;
      Drm: string;
      CodeOutlet: string;
      OutletName:string;
      DistrictArea: string;
      OutletType: string;
      OutletStatus: string;
      Ownership:string;
      AssetList:any[];
      CodeAssetList:any[];
     
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<OutletGoodsModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      if (this.data.CodeOutlet) {
        this.modelData = {
          id:this.data.id,
          Am: this.data.Am,
          Drm: this.data.Drm,
          CodeOutlet: this.data.CodeOutlet,
          OutletName: this.data.OutletName,
          DistrictArea: this.data.DistrictArea,
          OutletType:this.data.OutletType,
          OutletStatus:this.data.OutletStatus,
          AssetList:this.data. AssetList,
          CodeAssetList:this.data.CodeAssetList,
          Ownership:this.data.Ownership
        };
        this.event='update';
      }else{
        this.modelData = {
          id:0,
          Am: '',
          Drm: '',
          CodeOutlet: '',
          OutletName:'',
          DistrictArea: '',
          OutletType:'',
          OutletStatus:'',
          Ownership:'',
          AssetList:[],
          CodeAssetList:[]
        };
      }
     
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  

  
    async doSave() {
      try {
        this.onRequest = true;

        const method=this.event=='save' ?  'POST' : 'PATCH';
        const url=this.event=='save' ?  `Api/v1/Outlets` : `Api/v1/Outlets/${this.modelData.id}`;

        await this._globalService.runRequest(
          method,
          url,
          [],
          [
            { key: 'Am', value: this.modelData.Am },
            { key: 'Drm', value: this.modelData.Drm },
            { key: 'CodeOutlet', value: this.modelData.CodeOutlet },
            { key: 'OutletName',  value: this.modelData.OutletName },
            { key: 'DistrictArea', value: this.modelData.DistrictArea },
            { key: 'OutletType', value: this.modelData.OutletType },
            { key: 'OutletStatus', value: this.modelData.OutletStatus },
            { key: 'Asset', value: this.modelData.CodeAssetList },
           
          ]
        );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }
    
    async exportTemplateAsset() {
      try {
          
          // const token = await this._globalService.getStorage('token');
          // const parameter = [
          //     { key: 'access_token', value: token },
  
              
          // ];
          const req = await this._globalService.runRequest('GET', 'Api/v1/Outlets-goods/download-template-asset', []);
          window.location.href = req;
      } catch (error) {
          this._globalService.showNotif(error.message,'error');
      }
  
    }

    async exportTemplateInventory() {
      try {
          
          // const token = await this._globalService.getStorage('token');
          // const parameter = [
          //     { key: 'access_token', value: token },
  
              
          // ];
          const req = await this._globalService.runRequest('GET', 'Api/v1/Outlets-goods/download-template-inventory', []);
          window.location.href = req;
      } catch (error) {
          this._globalService.showNotif(error.message,'error');
      }
  
    }

    

    async attachFile() {
      if (!this.onUpload) {
          document.getElementById(`fileInput`).click();
      }
        
    }

    async fileChange(file: any) {
      try {
        this.onUpload=true;
          if (file.length) {
              const size = file[0].size;
              if (  (size / 1000) > 50000) {
                  throw new Error(`File size is not allowed. Max file size is 50 MB`);
              }
              const filename: string = file[0].name;
              this.Attachment = filename;
              const extFl = filename.substring(filename.lastIndexOf('.'), filename.length);
              const isPDF = extFl === '.pdf' ? true : false;
              const isXls = extFl === '.xls' || extFl === '.xlsx' ? true : false;
              if (isPDF || isXls) {
          
                  const req = await this._globalService.runRequestUpload('', file[0]);
                  this.Attachment = filename;
                  this.AttachmentUrl = req.data.url;
                  this.NewAttachment = req.data.filename;
                 
              }
          }
  
          this.onUpload=false;
      } catch (error) {
          this._globalService.showAlert(error.message);
      }
    }
   
 

    addAsset() {
     
      const dialogRef = this._dialog.open(GoodsAddModalComponent, {
          width: '500px',
          disableClose: false,
          autoFocus: false,
          data: {},
        });
  
    
      dialogRef.afterClosed().subscribe((result: any[]) => {
        if (result) {

          console.log(result,'result')
          for (const itemResult of result) {
            const filter = this.modelData.CodeAssetList.filter((iFilter: string) => {
              return iFilter === itemResult.CodeAsset;
            });
          
            if (!filter.length) {
            
              this.modelData.CodeAssetList.push(itemResult.CodeAsset);
              this.modelData.AssetList.push(itemResult);
            }
          }
        }
      });
  }
   
  
  }


  @Component({
    selector: 'app-goods-modal',
    templateUrl: './goods-modal.component.html',
    styleUrls: ['./outlet-goods-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class GoodsAddModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';
  
    modelData: {
      id:number;
      GoodsName: string;
      GoodsType: string;
      Specification: string;
      Qty: number;
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<GoodsAddModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
     
        this.modelData = {
          id:0,
          GoodsName: '',
          GoodsType: '',
          Specification: '',
          Qty: 0
        };
      
     
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  
    openModalAsset() {
      const dialogRef = this._dialog.open(ListGoodsModalComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: false,
        data: {},
      });
  
   
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.modelData.GoodsName = result.GoodsName;
                this.modelData.GoodsType = result.GoodsType;
                this.modelData.Specification = result.Specification;
            }
        });
    }

  
    async doAdd() {
      try {
        this.onRequest = true;

        const method=this.event=='save' ?  'POST' : 'PATCH';
        const url=this.event=='save' ?  `Api/v1/Outlets` : `Api/v1/Outlets/${this.modelData.id}`;

        // await this._globalService.runRequest(
        //   method,
        //   url,
        //   [],
        //   [
        //     { key: 'Am', value: this.modelData.Am },
        //     { key: 'Drm', value: this.modelData.Drm },
        //     { key: 'CodeOutlet', value: this.modelData.CodeOutlet },
        //     { key: 'OutletName',  value: this.modelData.OutletName },
        //     { key: 'DistrictArea', value: this.modelData.DistrictArea },
        //     { key: 'OutletType', value: this.modelData.OutletType },
        //     { key: 'OutletStatus', value: this.modelData.OutletStatus },
        //     { key: 'Employee', value: this.modelData.EmpIDList },
           
        //   ]
        // );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }

  }


  @Component({
    selector: 'app-list-goods-modal',
    templateUrl: './list-goods-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ListGoodsModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      GoodsName: string;
      GoodsType: string;
      Specification: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<ListGoodsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        GoodsName: '',
        GoodsType:'',
        Specification:''
      };
  
      // this.trainingList = await this.getMasterTrainingNonMandatory();
      this.previewData = await this.getMasterGoods();

      this.previewData.map(item => {
        let isChecked = false;
        if (this.data.defaultValue) {
          for (const key in item) {
            isChecked = item[key] === this.data.defaultValue ? true : false;
            if (isChecked) break;
          }
        }
        item['checked'] = isChecked;
      });
      this.tempData = this.previewData;
    }
  
    doCancel() {
      this._dialogRef.close();
    }
  
    async getMasterGoods() {
      try {
        this.onRequest = true;
        const req = await this._globalService.runRequest(
          'POST',
          'api/v1/Outlets-goods/Goods'
        );
        return req;
      } catch (error) {
        this._globalService.showNotif(error.message);
      } finally {
        this.onRequest = false;
      }
    }
  
    onSearch() {
      if (this.search) {
        const filterData = this.tempData.filter(item => {
          let isTrue: boolean = false;
          for (const key in item) {
            if (typeof item[key] === 'string') {
              const val = item[key].toLowerCase();
              if (val.indexOf(this.search.toLowerCase()) > -1) {
                isTrue = true;
                break;
              }
            }
          }
          return isTrue;
        });
        this.previewData = filterData;
      } else {
        this.previewData = this.tempData;
      }
    }
  
    onRowClick(index: number) {
      this.previewData.map(item => {
        item.checked = false;
      });
      this.previewData[index].checked = true;
      this.tempData[index].checked = true;
    }
  
    doAction() {
      const filterData = this.previewData.filter(iFilter => {
        return iFilter.checked === true;
      });
      const selectedData = filterData.length ? filterData[0] : null;
      this._dialogRef.close(selectedData);
    }
  
  }


  
 




