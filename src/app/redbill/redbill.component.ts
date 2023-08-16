import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';
import { DynamicService } from 'app/services/dynamic.service';

@Component({
  selector: 'app-redbill',
  templateUrl: './redbill.component.html',
  styleUrls: ['./redbill.component.css']
})
export class RedbillComponent implements OnInit {


  tblSchema: any =  {
    name: "MsRedbill",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/redbill/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "Q1",
        title: "Date",
        width: 200,
        canOrder: true,
        isSticky: false,
        filterOptions: {
          canFilter: true,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q3",
        title: "",
        width: 200,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: true,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q3",
        title: "",
        width: 80,
        canOrder: true,
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
        title: "",
        width: 80,
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
        title: "",
        width: 80,
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
        title: "",
        width: 80,
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
        title: "",
        width: 80,
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
        title: "",
        width: 80,
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
        name: "Q10",
        title: "",
        width: 80,
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
      private _dialog: MatDialog,
     
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
    this._globalService.eventPublish('loadTableSAM:MsRedbill', true);
  }



 
}
