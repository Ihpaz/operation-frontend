import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISForm } from './form-detail.interface';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css'],
  providers: [
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
],
})
export class FormDetailComponent implements OnInit {

  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog,
      private _route: ActivatedRoute,
    ) { }
  
    schema: {
      id:number,
      Tittle:string,
      Remarks:string,
      Questions:any[],
      answer:any[]
    }

    value: any = {};

    isMultiple: string[]=['Multiple choice','Checkboxes','Dropdown'];

   

  async ngOnInit() {

    this.schema = {
      id:0,
      Tittle:'',
      Remarks:'',
      Questions:[
       
      ],
      answer:[]
    }

    await this._route.queryParams.subscribe((params) => {
      if(params.id){
        this.schema.id=params.id;
 
      }
    })

    if(this.schema.id > 0) await this.getData();
  }

  async getData() {
    try {
      const req = await this._globalService.runRequest(
        'GET',
        `Api/v1/form/${this.schema.id}`,
        [],
      );


      this.schema =req;
      return true;
    } catch (error) {
      this._globalService.showNotif(error.message);
    }
  }

  addQuestions(){
    const maxValue = this.schema.Questions.reduce((max, obj) => {
      return obj.id > max ? obj.id : max;
    }, 0);

   
    this.schema.Questions.push(
        {id:maxValue+1,QuestionName:'',QuestionType:'Short Answer',Options:[]}
    )
  }

  deleteQuestions(id:number){

    const newQuestions=  this.schema.Questions.filter(obj => obj.id !== id);

    this.schema.Questions = newQuestions;
    // this.schema.questions.splice(id, 1);
  }

  changeQuestions(index:number,event:any,field:string){
   
    let value:any='';
    if(!event.value){
      value=event;
    }else{
      value=event.value;
    }
    this.schema.Questions[index][field] =  value;

    console.log(field,this.isMultiple.includes(value))
    if(field=='QuestionType' && this.isMultiple.includes(value))
    {

      console.log(this.schema.Questions[index].Options.length,'length')
      if(this.schema.Questions[index].Options.length == 0){
        this.schema.Questions[index].Options=[
          {id:1,label:'',value:''}
        ]
      }
    
    }

    console.log(this.schema,'schema')
  }

  addOptions(index:number){
    const maxValue = this.schema.Questions[index].Options.reduce((max, obj) => {
      return obj.id > max ? obj.id : max;
    }, 0);
   
    this.schema.Questions[index].Options.push(
      {id:maxValue+1,label:'',value:''}
    )
  }

  deleteOption(idQ:number,idO:number){

    const newOptions=  this.schema.Questions[idQ].Options.filter(obj => obj.id !== idO);
    this.schema.Questions[idQ].Options = newOptions;
  }

  changeOptions(idQ:number,idO:number,event:any){
    let value:any='';
    if(!event.value){
      value=event;
    }else{
      value=event.value;
    }
    this.schema.Questions[idQ].Options[idO].label =  value;
  }


  async doSave() {
    try {
     

      const req = await this._globalService.runRequest(
        'POST',
        'Api/v1/form',
        [],
        [
          { key: 'id', value: this.schema.id },
          { key: 'Tittle', value: this.schema.Tittle },
          { key: 'Remarks', value: this.schema.Remarks },
          { key: 'Questions', value: this.schema.Questions },
        
         
        ]
      );
      
      this.schema = req;

      this._globalService.showNotif('Berhasil disimpan !')
      
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } 
  }

  
 

}
