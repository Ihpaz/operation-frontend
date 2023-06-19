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
    selector: 'app-voc-modal',
    templateUrl: './voc-modal.component.html',
    styleUrls: ['./voc-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class VocModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';
    listCategoryComplaint:string[]=['BBQ','FOOD SAFETY','SIDE DISH','CUSTOMER SERVICE',
                   'TOPPER','OUT OF STOCK','WT','LAMIAN','OTHERS','SARAN'
                  ];
   


                
  
    modelData: {
      id:number;
      OutletName: string;
      Comment: string;
      Source : string;
      CategoryComplaint : string;
      SubCategoryComplaint : string;
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<VocModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      if (this.data.OutletName) {
        this.modelData = {
          id:this.data.id,
          OutletName: this.data.OutletName,
          Comment: this.data.Comment,
          Source: this.data.Source,
          CategoryComplaint: this.data.CategoryComplaint,
          SubCategoryComplaint:this.data.SubCategoryComplaint

        };
        this.event='update';
      }else{
        this.modelData = {
          id:0,
          OutletName:'',
          Comment: '',
          Source:'',
          CategoryComplaint: '',
          SubCategoryComplaint:''
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
        const url=this.event=='save' ?  `Api/v1/voc` : `Api/v1/voc/vocnegatif/${this.modelData.id}`;

        await this._globalService.runRequest(
          method,
          url,
          [],
          [
            { key: 'CategoryComplaint', value: this.modelData.CategoryComplaint },
            { key: 'SubCategoryComplaint', value: this.modelData.SubCategoryComplaint },
            { key: 'id',  value: this.modelData.id }
           
          ]
        );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }

    openModalSubCategory() {
      const dialogRef = this._dialog.open(VocSubCategoryModalComponent, {
        width: '700px',
        disableClose: false,
        autoFocus: false,
        data: this.modelData,
      });
  
   
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.modelData.SubCategoryComplaint = result.Code;
                this.modelData.CategoryComplaint = result.Category;
            }
        });
    }
  
  }

  @Component({
    selector: 'app-voc-subcategory-modal',
    templateUrl: './voc-subcategory-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class VocSubCategoryModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
     
    listSubCategoryComplaint:any[]=[
      {Category:'BBQ',Title:'NASI',Code:'NASI',Problem:['Keras','Lembek','Dingin']},
      {Category:'BBQ',Title:'Ayam/Bebek',Code:'BBQ-1',Problem:['Kering','Keras','Alot']}, 
      {Category:'BBQ',Title:'Ayam/Bebek',Code:'BBQ-2',Problem:['Tidak Matang','Busuk']},  
      {Category:'BBQ',Title:'Ayam/Bebek',Code:'BBQ-3',Problem:['Potongan Kecil','Hancur']}, 
      {Category:'BBQ',Title:'Ayam/Bebek',Code:'BBQ-4',Problem:['Not Crispy/Too Hard']},  
      {Category:'BBQ',Title:'Ayam/Bebek',Code:'BBQ-5',Problem:['Asam/Pahit/Amis']}, 
      {Category:'BBQ',Title:'Sauce',Code:'BBQ-6',Problem:['Spicy Consistency']},   
      {Category:'FOOD SAFETY',Title:'Foreign Material',Code:'FS',Problem:['Ada ranbut,Pecahan kaca,cangkang telur,kerikil,ulat']}, 
      {Category:'SIDE DISH',Title:'Siomay/Gorengan',Code:'SD-1',Problem:['Asin/Hambar/Asam']},                        
      {Category:'SIDE DISH',Title:'Siomay/Gorengan',Code:'SD-2',Problem:['Keras/Dingin']}, 
      {Category:'CUSTOMER SERVICE',Title:'Cashier/Waiters',Code:'CS-1',Problem:['Jutek','Tidak Ramah','Tidak Sopan']},                
      {Category:'CUSTOMER SERVICE',Title:'Cashier/Waiters',Code:'CS-2',Problem:['Tidak Hafal Promo']},                
      {Category:'CUSTOMER SERVICE',Title:'Online Order/TA',Code:'Online',Problem:['Missing order/item']},                
      {Category:'CUSTOMER SERVICE',Title:'PACKAGING',Code:'PACKAGING',Problem:['Packaging Bocor']},  
      {Category:'CUSTOMER SERVICE',Title:'Drinks',Code:'DRINKS',Problem:['Drinks Tasteless (Hambar)']},   
      {Category:'CUSTOMER SERVICE',Title:'Ambeince Store',Code:'AMBIENCE-1',Problem:['Kurang Bersih/Ada Lalat']},             
      {Category:'CUSTOMER SERVICE',Title:'Ambeince Store',Code:'AMBIENCE-2',Problem:['Suhu Panas']},
      {Category:'CUSTOMER SERVICE',Title:'Cuttleries',Code:'CUTTLERIES',Problem:['Tidak Bersih/Rusak']},
      {Category:'TOPPER',Title:'Porsi',Code:'PORSI-1',Problem:['Kualitatif(Subjektif Customer)']},
      {Category:'TOPPER',Title:'Porsi',Code:'PORSI-2',Problem:['Tidak Sesuai FIS/ Missing Ingredient']},
      {Category:'TOPPER',Title:'Soup',Code:'SOUP-1',Problem:['Kuah Dingin']},
      {Category:'TOPPER',Title:'Soup',Code:'SOUP-2',Problem:['Rasa Tidak Sesuai(Garlic Miso,Collagen,Tori,Curry,Cheese)']},
      {Category:'TOPPER',Title:'TOPPING',Code:'TOP-1',Problem:['Ayam Chasu/Beef Hancur']},
      {Category:'TOPPER',Title:'TOPPING',Code:'TOP-2',Problem:['Topping Busuk + Ayam Jamur Asam']},
      {Category:'TOPPER',Title:'TOPPING',Code:'TOP-2',Problem:['Topping Busuk + Ayam Jamur Asam']},
      {Category:'OUT OF STOCK',Title:'Menu Kosong',Code:'OUT OF STOCK',Problem:['Menu Kosong']},
      {Category:'WT',Title:'Waiting Time',Code:'WT',Problem:['Waktu tunggu makanan lama/keluar makanannya lama']},
      {Category:'LAMIAN',Title:'TEKSTUR',Code:'LM-1',Problem:['LEMBEK','ALOT','LENGKET']},
      {Category:'LAMIAN',Title:'AROMA',Code:'LM-2',Problem:['Bau Kecoa/Bau Tidak Sedap']},
      {Category:'OTHERS',Title:'',Code:'OTHERS',Problem:['Masalah tidak specifik atau variable terlalu luas dengan frekuensi yang rendah']},
      {Category:'SARAN',Title:'',Code:'SARAN',Problem:['Customer merasa bad experience tpi tidak menjelaskan masalahnya apa melainkan kasih masukan']},
    ]

    modelData: {
      Category: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<VocSubCategoryModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      let listSub =  this.listSubCategoryComplaint;
      if(this.data.CategoryComplaint){
        this.modelData = {
          Category: this.data.CategoryComplaint,
        };

        listSub =  this.listSubCategoryComplaint.filter(iFilter =>{
          return iFilter.Category === this.modelData.Category;
        });

        console.log( listSub)

      }else{
        this.modelData = {
          Category: '',
        };
      }
      
  
   
      // this.previewData = await this.getMasterDistrict();
      this.previewData =listSub
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
  
    // async getMasterDistrict() {
    //   try {
    //     this.onRequest = true;
    //     const req = await this._globalService.runRequest(
    //       'POST',
    //       'api/v1/Outlets/district'
    //     );
    //     return req;
    //   } catch (error) {
    //     this._globalService.showNotif(error.message);
    //   } finally {
    //     this.onRequest = false;
    //   }
    // }
  
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


  





