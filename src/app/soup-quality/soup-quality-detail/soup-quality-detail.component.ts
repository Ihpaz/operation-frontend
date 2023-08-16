import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISForm } from './soup-quality-detail.interface';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

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
  selector: 'app-soup-quality-detail',
  templateUrl: './soup-quality-detail.component.html',
  styleUrls: ['./soup-quality-detail.component.css'],
  providers: [
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
],
})
export class SoupQualityDetailComponent implements OnInit {

  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog,
      private _route: ActivatedRoute,
      private sanitizer: DomSanitizer,
      private _mediaMatcher: MediaMatcher,
    ) { }
  
    schema: {
      TransId:number,
      formId:number,
      Tittle:string,
      Remarks:string,
      FormData:any[],
      Questions:any[],
      answer:any[]
    }

    value: any = {};

    isMultiple: string[]=['Multiple choice','Checkboxes','Dropdown']
    outlet:string='';

    onUpload: boolean = false;
    acceptExt: string = ".jpg,.jpeg";
    url: string = '';
    Attachment:string='';
    AttachmentUrl:string='';
    NewAttachment:string='';
    isSmallScreen:boolean = false;


  async ngOnInit() {
    const mediaQueryList = this._mediaMatcher.matchMedia('(max-width: 550px)');
    this.isSmallScreen = mediaQueryList.matches;

    this.schema = {
      TransId:0,
      formId:0,
      Tittle:'',
      Remarks:'',
      FormData:[],
      Questions:[
       
      ],
      answer:[]
    }

    await this._route.queryParams.subscribe((params) => {
      if(params.id){
        this.schema.TransId=params.id;
 
      }
    })
    this.outlet = await this._globalService.getStorage('outlet');
    await this.getData();
    console.log(this.schema,'schema')
  }

  async getData() {
    try {
      const req = await this._globalService.runRequest(
        'GET',
        `Api/v1/soup-quality/${this.schema.TransId}`,
        [],
      );


      this.schema =req;

      let no:number=1;
      // for(const dt of this.schema.Questions){
      //     dt.QuestionName =no+". "+dt.QuestionName;
      //     no++;
      // }
      return true;
    } catch (error) {
      this._globalService.showNotif(error.message);
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  async addUserAnswer(index,Questions,value,Tipe="") {
    console.log(Questions,value)
    this.schema.Questions[index]['AnswerValue']=value;
    console.log(this.schema,'schema')
  }

  async doSave() {
    try {
     

      const req = await this._globalService.runRequest(
        'POST',
        'Api/v1/soup-quality',
        [],
        [
          { key: 'id', value: this.schema.TransId },
          { key: 'formId', value: this.schema.formId },
          { key: 'Tittle', value: this.schema.Tittle },
          { key: 'Remarks', value: this.schema.Remarks },
          { key: 'Answer', value: this.schema.Questions },
          { key: 'CodeOutlet', value: this.outlet },
          { key: 'OutletName', value: this.outlet },
        
         
        ]
      );
      
      this.schema = req;

      this._globalService.showNotif('Berhasil disimpan !')
      
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } 
  }


  
  async attachFile() {
    if (!this.onUpload) {
        document.getElementById(`fileInput`).click();
    }
      
  }

  async fileChange(file: any,index) {
    try {
      this.onUpload=true;
        if (file.length) {
            const size = file[0].size;
            if (  (size / 1000) > 50000) {
                throw new Error(`File size is not allowed. Max file size is 50 MB`);
            }
            const filename: string = file[0].name;
            this.Attachment = filename;
            // const extFl = filename.substring(filename.lastIndexOf('.'), filename.length);
            // const isPDF = extFl === '.pdf' ? true : false;
            // const isXls = extFl === '.xls' || extFl === '.xlsx' ? true : false;
            // if (isPDF || isXls) {
        
                const req = await this._globalService.runRequestUpload('', file[0]);
                this.Attachment = filename;
                this.AttachmentUrl = req.data.url;
                this.NewAttachment = req.data.filename;
                this.schema.Questions[index]['AttachmentUrl'] =   this.AttachmentUrl;
                this.schema.Questions[index]['NewAttachment'] =   this.NewAttachment;
                this.schema.Questions[index]['AnswerValue'] =   this.AttachmentUrl;
               
            // }
        }

        this.onUpload=false;
    } catch (error) {
        this._globalService.showAlert(error.message);
    }
  }
  
  async removeAttachment(event: any, i: number) {
    event.preventDefault();
    event.stopPropagation();
    this.schema.Questions[i]['AttachmentUrl']='';
    this.schema.Questions[i]['NewAttachment']='';
    this.schema.Questions[i]['AnswerValue']='';
   
  }
 

}
