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

    AttachmentInv:string='';
    AttachmentUrlInv:string='';
    NewAttachmentInv:string='';
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
      InventoryList:any[];
      CodeInventoryList:any[];
     
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
          Ownership:this.data.Ownership,
          InventoryList:this.data.InventoryList,
          CodeInventoryList:this.data.CodeInventoryList
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
          CodeAssetList:[],
          InventoryList:[],
          CodeInventoryList:[]
        };
      }
     
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  

  
    async doSave() {
      try {
        this.onRequest = true;

        console.log('masuksave')
        if(!this.modelData.AssetList.length) throw new Error(`Required Asset!`);
        if(!this.modelData.InventoryList.length) throw new Error(`Required Inventory!`);

     
        const url=`Api/v1/Outlets-goods/createoutletgoods`;

        await this._globalService.runRequest(
          'POST',
          url,
          [],
          [
          
            { key: 'OutletId', value: this.modelData.id },
            { key: 'Asset', value: this.modelData.AssetList },
            { key: 'Inventory', value: this.modelData.InventoryList },
           
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

    async importTemplateAsset() {
      try {
        
       let url='Api/v1/Outlets-goods/import-template-asset';
       const req= await this._globalService.runRequest(
          'POST',
           url,
          [],
          [
            { key: 'Attachment', value: this.NewAttachment },
            { key: 'CodeOutlet', value: this.modelData.CodeOutlet }
          ]
        );
          
       
      for(const item of req.data.Result){
        this.modelData.AssetList.push(item);
      }
       
      } catch (error) {
        this._globalService.showNotif(error.message);
      } 
    }

    async importTemplateInventory() {
      try {
        
       let url='Api/v1/Outlets-goods/import-template-inventory';
       const req= await this._globalService.runRequest(
          'POST',
           url,
          [],
          [
            { key: 'Attachment', value: this.NewAttachmentInv },
            { key: 'CodeOutlet', value: this.modelData.CodeOutlet }
          ]
        );
          
      
        for(const item of req.data.Result){
          this.modelData.InventoryList.push(item);
        }

      } catch (error) {
        this._globalService.showNotif(error.message);
      } 
    }

    async attachFile() {
      if (!this.onUpload) {
          document.getElementById(`fileInput`).click();
      }
        
    }

    removeAttachment(event){
      event.preventDefault();
      event.stopPropagation();
      this.Attachment='';
      this.NewAttachment='';
      this.AttachmentUrl='';
    }
    
    removeAttachmentInv(event){
      event.preventDefault();
      event.stopPropagation();
      this.AttachmentInv='';
      this.NewAttachmentInv='';
      this.AttachmentUrlInv='';
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

    async fileChangeInv(file: any) {
      try {
        this.onUpload=true;
          if (file.length) {
              const size = file[0].size;
              if (  (size / 1000) > 50000) {
                  throw new Error(`File size is not allowed. Max file size is 50 MB`);
              }
              const filename: string = file[0].name;
              this.AttachmentInv = filename;
              const extFl = filename.substring(filename.lastIndexOf('.'), filename.length);
              const isPDF = extFl === '.pdf' ? true : false;
              const isXls = extFl === '.xls' || extFl === '.xlsx' ? true : false;
              if (isPDF || isXls) {
          
                  const req = await this._globalService.runRequestUpload('', file[0]);
                  this.AttachmentInv = filename;
                  this.AttachmentUrlInv = req.data.url;
                  this.NewAttachmentInv = req.data.filename;
                 
              }
          }
  
          this.onUpload=false;
      } catch (error) {
          this._globalService.showAlert(error.message);
      }
    }

    addAsset() {
      const dialogRef = this._dialog.open(AssetAddModalComponent, {
          width: '500px',
          disableClose: false,
          autoFocus: false,
          data: {CodeOutlet:this.modelData.CodeOutlet},
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if (result) {

          console.log(result,'result')
          for (const itemResult of result.ModalData) {
            const filter = this.modelData.CodeAssetList.filter((iFilter: string) => {
              return iFilter === itemResult.AssetId;
            });
          
            if (!filter.length) {
              const params: any={};
              this.modelData.CodeAssetList.push(itemResult.AssetId);

              params['GoodsId']=itemResult.id;
              params['OutletId']=this.modelData.CodeOutlet;
              params['GoodsName']=itemResult.GoodsName;
              params['Specification']=itemResult.Specification;
              params['GoodsType']='ASSET';
              params['AssetId']=itemResult.AssetId;

              this.modelData.AssetList.push(itemResult);
            }
          }
        }
      });

      
    }

    addInventory() {
      const dialogRef = this._dialog.open(InventoryAddModalComponent, {
          width: '500px',
          disableClose: false,
          autoFocus: false,
          data: {},
        });
  
    
      dialogRef.afterClosed().subscribe(result  => {
        if (result) {

            console.log(result,'resultinv')
        
            const filter = this.modelData.CodeInventoryList.filter((iFilter: string) => {
              return iFilter === result.ModalData.id;
            });
          
            if (!filter.length) {
              const params: any={};
              params['GoodsId']=result.ModalData.id;
              this.modelData.CodeInventoryList.push(params);

              params['OutletId']=this.modelData.CodeOutlet;
              params['GoodsName']=result.ModalData.GoodsName;
              params['Specification']=result.ModalData.Specification;
              params['GoodsType']=result.ModalData.GoodsType;
              params['Qty']=result.ModalData.Qty;

              this.modelData.InventoryList.push(params);
            }
          
        }
      });
    }

    deleteAsset(param: string) {
    
      this.modelData.CodeAssetList = this.modelData.CodeAssetList.filter((iFilter: string) => {
        return iFilter !== param;
      });
  
      this.modelData.AssetList = this.modelData.AssetList.filter((iFilter: any) => {
        return iFilter.AssetId !== param;
      });
    }

    deleteInv(param: string) {
     
      this.modelData.CodeInventoryList = this.modelData.CodeInventoryList.filter((iFilter: string) => {
        return iFilter !== param;
      });
  
      this.modelData.InventoryList = this.modelData.InventoryList.filter((iFilter: any) => {
        return iFilter.GoodsName !== param;
      });
    }
   
  
  }


  @Component({
    selector: 'app-asset-modal',
    templateUrl: './asset-modal.component.html',
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
  
  export class AssetAddModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';
  
    modelData: {
      id:number;
      CodeOutlet:string;
      GoodsName: string;
      GoodsType: string;
      Specification: string;
      Qty: number;
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<AssetAddModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
     
        this.modelData = {
          id:0,
          CodeOutlet:this.data.CodeOutlet,
          GoodsName: '',
          GoodsType: '',
          Specification: '',
          Qty: 0
        };
      
     
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  
    openModallistGoods() {
      const dialogRef = this._dialog.open(ListAssetModalComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: false,
        data: {},
      });
  
   
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            
                this.modelData.GoodsName = result.GoodsName;
                this.modelData.id = result.id;
                this.modelData.Specification = result.Specification;
            }
        });
    }

  
    async doAdd() {
      try {
        
        const req = await this._globalService.runRequest(
          'POST',
          'api/v1/Outlets-goods/generatecodeasset',
          [],
          [
            
            {key:'CodeOutlet',value:this.modelData.CodeOutlet},
            {key:'GoodsId',value:this.modelData.id},
            {key:'GoodsType',value:'ASSET'},
            {key:'GoodsName',value:this.modelData.GoodsName},
            {key:'GoodsType',value:this.modelData.GoodsType},
            {key:'Specification',value:this.modelData.Specification},
            {key:'Qty',value:this.modelData.Qty}
          ]
        );

        this._dialogRef.close({
          event:"add",
          ModalData:req
        });

      } catch (error) {
          this._globalService.showNotif(error.message,'error');
      }
      
    }

  }


  @Component({
    selector: 'app-inventory-modal',
    templateUrl: './inventory-modal.component.html',
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
  
  export class InventoryAddModalComponent implements OnInit {
  
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
      public _dialogRef: MatDialogRef<InventoryAddModalComponent>,
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
  
    openModallistGoods() {
      const dialogRef = this._dialog.open(ListInventoryModalComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: false,
        data: {},
      });
  
   
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.modelData.GoodsName = result.GoodsName;
                this.modelData.id = result.id;
                this.modelData.Specification = result.Specification;
            }
        });
    }

  
    async doAdd() {
      this._dialogRef.close({
        event:"add",
        ModalData:this.modelData
      });
    }

  }


  @Component({
    selector: 'app-list-asset-modal',
    templateUrl: './list-asset-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ListAssetModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      id:number,
      GoodsName: string;
      GoodsType: string;
      Specification: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<ListAssetModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        id:0,
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
          'api/v1/Outlets-goods/Goods',
          [],
          [{key:'GoodsType',value:'ASSET'}]
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

  @Component({
    selector: 'app-list-inventory-modal',
    templateUrl: './list-inventory-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ListInventoryModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      id:number,
      GoodsName: string;
      GoodsType: string;
      Specification: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<ListInventoryModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        id:0,
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
          'api/v1/Outlets-goods/Goods',
          [],
          [{key:'GoodsType',value:'Inventory'}]
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


  
 




