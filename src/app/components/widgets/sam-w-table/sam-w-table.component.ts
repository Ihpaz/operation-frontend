import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalService } from 'app/services/global.service';


export interface ISAMWTable {
  name: string;
  headers: string[];
  requestOptions: {
    path: string;
    params: {
      key: string;
      value: any;
    }[];
    paramsCanNull?: boolean;
  };
  limit: number;
  pageSize: number[];
  withAction: boolean;
  isSmallScreen: boolean;
}

@Component({
  selector: 'app-sam-w-table',
  templateUrl: './sam-w-table.component.html',
  styleUrls: ['./sam-w-table.component.scss']
})
export class SamWTableComponent implements OnInit {

  @Input() schema: ISAMWTable;
  @Input() globalValue: any = {};
  @Output() onDataValue = new EventEmitter();
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource: any[] = [];

  showSpinner: boolean = false;
  limit: number = 10;
  skip: number = 0;
  totalData: number = 0;
  useFilterFields: boolean = false;
  WithPagination: boolean =true;
  orderBy: any = {
    field: '',
    value: '',
  };

  constructor(
    private _globalService: GlobalService,
  ) { }

  async ngOnInit() {
    try {
      this.limit = this.schema.pageSize.length ? this.schema.pageSize[0] : 10;
      this.WithPagination =this.globalValue.hasOwnProperty('WithPagination') ?  this.globalValue['WithPagination'] :true;
      const dataRaw = await this.getData();
      this.dataSource = dataRaw;
      this.onDataValue.emit(this.dataSource);

      this._globalService.eventSubscribe(`loadTableSAM:${this.schema.name}`, async (isLoad: boolean) => {
        try {
          if (isLoad) {
            if (!this.skip) {
              this.limit = this.schema.pageSize.length ? this.schema.pageSize[0] : 10;
              this.skip = 0;
              const dataRaw = await this.getData();
              this.dataSource = dataRaw;
              this.onDataValue.emit(this.dataSource);
            } else {
              this.paginator.firstPage();
            }
          }
        } catch (error) {
          this._globalService.showNotif(error.message);
        }
      });
    } catch (error) {
      this._globalService.showNotif(error.message);
    }

  }

  async getData() {
    try {
      this.showSpinner = true;
      const bodyData: any = {};
      for (const item of this.schema.requestOptions.params) {
        bodyData[item.key] = this.globalValue.hasOwnProperty(item.key) ? this.globalValue[item.key] : item.value;
      };

      const body: any[] = [
        {
          key: 'limit',
          value: this.limit,
        },
        {
          key: 'skip',
          value: this.skip,
        },
        {
          key: 'data',
          value: bodyData,
        },
        {
          key: 'orderBy',
          value: this.orderBy,
        },
        {
          key: 'filter',
          value: [],
        }
      ];
      const req = await this._globalService.runRequest('POST', this.schema.requestOptions.path, [], body);
      const data: any[] = req.data;
      this.totalData = req.total;
      return data;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.showSpinner = false;
    }
  }

  async eventPaginator(event: any) {
    try {
      this.limit = event.pageSize;
      this.skip = event.pageIndex ? (this.limit * event.pageIndex) : 0;
      this.dataSource = [];
      // this.dataSource = await this.getData();
      const dataRaw = await this.getData();
      this.dataSource = dataRaw;
      this.onDataValue.emit(this.dataSource);
    } catch (error) {
      this._globalService.showNotif(error.message);
    }
  }

}
