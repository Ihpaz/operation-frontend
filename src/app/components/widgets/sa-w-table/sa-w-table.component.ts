import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { ISAWTableDyn } from './sa-w-table.interface';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';
import { timer } from 'rxjs';
import { GlobalService } from 'app/services/global.service';
import { DynamicService } from 'app/services/dynamic.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
    selector: 'app-sa-w-table',
    templateUrl: './sa-w-table.component.html',
    styleUrls: ['./sa-w-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class SaWTableComponent implements OnInit, OnDestroy {

    @Input() schema: ISAWTableDyn;
    @Input() globalValue: any = {};
    @Input() isSmallScreen: boolean = false;
    @Input() buildMode: string = 'web';
    @Output() onChangeValue = new EventEmitter();
    @Output() callbackAction = new EventEmitter();
    @Output() onDataValue = new EventEmitter();
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

    displayedFilters: any[] = [];
    displayedColumns: any[] = [];
    dataSource: any[] = [];
    dataFilterSelect: any = {};

    dataFilter: any[] = [];
    modelFilter: any = {};
    toModelFilter: any = null;

    showSpinner: boolean = true;
    limit: number = 10;
    skip: number = 0;
    totalData: number = 0;
    useFilterFields: boolean = false;
    orderBy: any = {
        field: '',
        value: '',
    };

    withCheckbox: boolean = false;
    checkedAll: boolean = false;
    tempCheckboxValue: any[] = [];
    isNoData: boolean = false;
    actionIsSticky: boolean = false;

    IsHide:boolean= false;
    IsShow:boolean=true;

    forMobileIsSet: boolean = false;
    forMobile: any = null;
    webSetting: any = {};
    StoreFieldAction:any={};

    useDownloadPdfBtn: boolean= false;

    constructor(
        private _globalService: GlobalService,
        private _dynamicService: DynamicService,
        private _ngZone: NgZone,
    ) { }

    async ngOnInit() {
        try {
            this.webSetting = await this._globalService.getStorage('webSetting');
            this.useFilterFields = this.schema.useFilterFields;
            this.withCheckbox = this.schema.hasOwnProperty('withCheckbox') ? this.schema.withCheckbox : false;
            this.IsHide =  this.schema.hasOwnProperty('IsHide') ? this.schema.IsHide : false;
            this.useDownloadPdfBtn =this.schema.hasOwnProperty('useDownloadPdfButton') ? this.schema.useDownloadPdfButton : false;
           
            console.log(this.schema,'schema')
            if (this.withCheckbox && this.webSetting && this.webSetting.hasOwnProperty('WebSettingTableCheckAll')) {
                this.withCheckbox = this.webSetting.WebSettingTableCheckAll;
            }

            if (this.withCheckbox) {
                this.modelFilter['checkboxActionArea'] = null;
                this.displayedFilters.push(`filter_checkboxActionArea`);
                this.displayedColumns.push('checkboxActionArea');
            }
           
           
            if (this.schema.fieldActions.length) {
                for (const item of this.schema.fields) {
                    if (item.isSticky) {
                        this.actionIsSticky = true;
                        break;
                    }
                }

                this.StoreFieldAction=this.schema.fieldActions;
            }

            for (const field of this.schema.fields) {
                this.modelFilter[field.name] = '';
                // this.displayedFilters.push(`filter_${field.name}`);
               
                this.displayedColumns.push(field.name);
                const filterOptions = field.filterOptions;
                if (filterOptions.canFilter && filterOptions.filterType === 'select') {
                    const filterSelect = filterOptions.filterSelect;
                    this.dataFilterSelect[`filterdata_${field.name}`] = await this.getDataFilterSelect(filterSelect.path, filterSelect.params, filterSelect.paramsCanNull);
                }
            }

            if (this.schema.fieldActions.length) {
                // this.displayedFilters.push(`filter_actionArea`);
                this.displayedColumns.push('actionArea');
            }
            this.limit = this.schema.pageSize.length ? this.schema.pageSize[0] : 10;
            const dataRaw = await this.getData();
            if (this.withCheckbox) {
                for (const item of dataRaw) {
                    item.isChecked_fn = false;
                }
            }
            this.dataSource = dataRaw;
            if (!this.dataSource.length) {
                this.isNoData = true;
                const fieldName = {};
                const data = [];
                for (const field of this.schema.fields) {
                    fieldName[field.name] = '';
                }
                data.push(fieldName);
                this.dataSource = data;
            }
            this.onDataValue.emit(this.dataSource);

            if (this.withCheckbox) {
                const finalValue = {};
                finalValue[`${this.schema.name}_checked`] = [];
                this.onChangeValue.emit(finalValue);
            }

            if (this.schema.hasOwnProperty('forMobile')) {
                this.forMobile = this.schema.forMobile;
                this.forMobileIsSet = true;
            } else {
                this.forMobileIsSet = true;
            }

            this._globalService.eventSubscribe(`loadTable:${this.schema.name}`, async (isLoad: boolean) => {
                try {
                  
                    if (isLoad) {
                        if (!this.skip) {
                            this.limit = this.schema.pageSize.length ? this.schema.pageSize[0] : 10;
                            this.skip = 0;
                            this.dataFilter = [];
                            const dataRaw = await this.getData();
                            if (this.withCheckbox) {
                                for (const item of dataRaw) {
                                    item.isChecked_fn = this.checkedAll;
                                }
                            }
                            this.dataSource = dataRaw;
                            if (!this.dataSource.length) {
                                this.isNoData = true;
                                const fieldName = {};
                                const data = [];
                                for (const field of this.schema.fields) {
                                    fieldName[field.name] = '';
                                }
                                data.push(fieldName);
                                this.dataSource = data;
                            } else {
                                this.isNoData = false;
                            }

                            this.onDataValue.emit(this.dataSource);

                        } else {
                            this.paginator.firstPage();
                        }
                    }
                } catch (error) {
                    this._globalService.showNotif(error.message);
                }finally{
                   
                }
            });

            if(this.IsHide && this.isNoData){
                this.IsShow=false;
            }
        } catch (error) {
            this._globalService.showNotif(error.message);
        }
    }

    ngOnDestroy() {
        this._globalService.eventDestroy(`loadTable:${this.schema.name}`);
    }

    ngAfterViewInit(): void {
        if (this.isSmallScreen) {
            const iViewInit = setInterval(() => {
                if (this.forMobileIsSet) clearInterval(iViewInit);
                if (this.forMobile) {
                    this.scroller.elementScrolled().pipe(
                        map(() => this.scroller.measureScrollOffset('bottom')),
                        pairwise(),
                        filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
                        throttleTime(200)
                    ).subscribe(() => {
                        this._ngZone.run(async () => {
                            try {
                                if (this.dataSource.length < this.totalData) {
                                    this.skip = this.skip + this.limit;
                                    const mergeData: any[] = [];
                                    const dataRaw = await this.getData();
                                    for (const item of dataRaw) {
                                        if (this.withCheckbox) {
                                            const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                                                return iTemp === item[this.schema.checkBoxId];
                                            });
                                            let isChecked = this.checkedAll ? true :
                                                filterTemp.length ? true : false;
                                            item.isChecked_fn = isChecked;
                                        }
                                        mergeData.push(item);
                                    }
                                    // this.dataSource = [];
                                    // this.dataSource = mergeData;

                                    timer(1000).subscribe(() => {
                                        this.dataSource = [...this.dataSource, ...mergeData];
                                        this.onDataValue.emit(this.dataSource);

                                    });
                                }
                            } catch (error) {
                                this._globalService.showNotif(error.message);
                            }
                        });
                    });
                }
            }, 200);
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
                    value: this.dataFilter,
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
            if (this.withCheckbox) {
                for (const item of dataRaw) {
                    const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                        return iTemp === item[this.schema.checkBoxId];
                    });
                    let isChecked = this.checkedAll ? true :
                        filterTemp.length ? true : false;
                    item.isChecked_fn = isChecked;
                }
            }
            this.dataSource = dataRaw;
            this.onDataValue.emit(this.dataSource);

        } catch (error) {
            this._globalService.showNotif(error.message);
        }
    }

    async sortData(sort: Sort) {
        try {
            this.orderBy.field = sort.active;
            this.orderBy.value = sort.direction.toUpperCase();
            this.dataSource = [];
            // this.dataSource = await this.getData();
            const dataRaw = await this.getData();
            if (this.withCheckbox) {
                for (const item of dataRaw) {
                    const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                        return iTemp === item[this.schema.checkBoxId];
                    });
                    let isChecked = this.checkedAll ? true :
                        filterTemp.length ? true : false;
                    item.isChecked_fn = isChecked;
                }
            }
            this.dataSource = dataRaw;
            // this.onDataValue.emit(this.dataSource);

        } catch (error) {
            this._globalService.showNotif(error.message);
        }
    }

    checkboxCheckShowHideCondition(value: any) {
        let isShow = true;
        if (this.schema.hasOwnProperty('checkBoxShowHideCondition') && this.schema.checkBoxShowHideCondition.useShowHideCondition) {
            isShow = this.checkShowHideAction(this.schema.checkBoxShowHideCondition, value);
        }
        return isShow;
    }

    checkShowHideAction(showHideCondition: any, value: any) {
        const finalValue: any = {
            ...this.globalValue
        };
        Object.assign(finalValue, value);
     
        const isShow = this._dynamicService.showHideCondition(finalValue, showHideCondition);
        return isShow;
    }

    async getDataFilterSelect(path: string, params: any[], paramsCanNull: boolean) {
        try {
            const req = await this._dynamicService.getData(this.globalValue, path, params, paramsCanNull);
            if (req.isRun) {
                return req.data;
            } else {
                return [];
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    doAction(action: any, value: any) {
        const finalValue: any = {};
        finalValue['fromBtnAct'] = true;
        if (action.type === 'openModal' || action.type === 'redirect' || action.type === 'pushPage' || action.type === 'dynamicRedirect') {
            for (const item of action.params) {
                finalValue[item.key] = value.hasOwnProperty(item.key) ? value[item.key] : item.value;
            }
        } else if (action.type === 'request') {
            for (const item of action.requestOptions.params) {
                finalValue[item.key] = value.hasOwnProperty(item.key) ? value[item.key] : item.value;
            }
        } else if (action.type === 'viewFile') {
            finalValue[action.viewFileKey] = value.hasOwnProperty(action.viewFileKey) ? value[action.viewFileKey] : null;
        }

        this.onChangeValue.emit(finalValue);

        const dtCallback={action:action.type,value:value};
        this.callbackAction.emit(dtCallback);
        // this.callbackAction.emit(value);
        
    }

    itemOnClick(value: any, index: number) {
        const forMobile = this.schema.forMobile;
        const totalActions = forMobile.actions.length;
        if (totalActions) {
            if (totalActions === 1) {
                const isShow = this.checkShowHideAction(forMobile.actions[0].action.showHideCondition, value);
                if (isShow) {
                    this.doAction(forMobile.actions[0].action, value);
                }
            } else {
                const dataRaw = this.dataSource;
                const selectedData = dataRaw[index];
                if (selectedData.hasOwnProperty('isExpandItemMobile') && selectedData.isExpandItemMobile) {
                    selectedData.isExpandItemMobile = false;
                } else {
                    selectedData.isExpandItemMobile = true;
                }
            }
        }
    }

    filterTextOnSearch() {
        if (this.toModelFilter) clearTimeout(this.toModelFilter);
        this.toModelFilter = setTimeout(async () => {
            try {
                this.dataFilter = [];
                for (const key in this.modelFilter) {
                    if (this.modelFilter[key]) {
                        this.dataFilter.push({
                            field: key,
                            value: this.modelFilter[key],
                        });
                    }
                }
                this.paginator.firstPage();
                this.limit = this.schema.pageSize.length ? this.schema.pageSize[0] : 10;
                this.skip = 0;
                this.dataSource = [];
                // this.dataSource = await this.getData();
                const dataRaw = await this.getData();
                if (this.withCheckbox) {
                    for (const item of dataRaw) {
                        const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                            return iTemp === item[this.schema.checkBoxId];
                        });
                        let isChecked = this.checkedAll ? true :
                            filterTemp.length ? true : false;
                        item.isChecked_fn = isChecked;
                    }
                }
                this.dataSource = dataRaw;
                if (!this.dataSource.length) {
                    this.isNoData = true;
                    const fieldName = {};
                    const data = [];
                    for (const field of this.schema.fields) {
                        fieldName[field.name] = '';
                    }
                    data.push(fieldName);
                    this.dataSource = data;
                } else {
                    this.isNoData = false;
                }
                this.onDataValue.emit(this.dataSource);

            } catch (error) {
                this._globalService.showNotif(error.message);
            }
        }, 1000);
    }

    checkedAllOnChange() {
        this.tempCheckboxValue = [];
        const dataRaw = this.dataSource;
        for (const item of dataRaw) {
            const isShow = this.checkboxCheckShowHideCondition(item);
            if (isShow) {
                item.isChecked_fn = this.checkedAll;
                if (this.checkedAll) {
                    this.tempCheckboxValue.push(item[this.schema.checkBoxId]);
                }
            }
        }
        this.dataSource = dataRaw;
        this.onDataValue.emit(this.dataSource);

        const finalValue = {};
        finalValue[`${this.schema.name}_checked`] = this.tempCheckboxValue;
        this.onChangeValue.emit(finalValue);
    }

    rowCheckedOnChange() {
        const dataRaw = this.dataSource;
        for (const item of dataRaw) {
            if (item.isChecked_fn) {
                const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                    return iTemp === item[this.schema.checkBoxId];
                });
                if (!filterTemp.length) {
                    this.tempCheckboxValue.push(item[this.schema.checkBoxId]);
                }
            } else {
                const filterTemp = this.tempCheckboxValue.filter(iTemp => {
                    return iTemp !== item[this.schema.checkBoxId];
                });
                this.tempCheckboxValue = filterTemp;
            }
        }
        const finalValue = {};
        finalValue[`${this.schema.name}_checked`] = this.tempCheckboxValue;
        this.onChangeValue.emit(finalValue);
    }

    openModalSelect() {
        // this._dynamicService.showModalSelect('', [], '', '', true);
    }

    async downloadPdf(){
        const token = await this._globalService.getStorage('token');
        const bodyData: any = {};
        for (const item of this.schema.requestOptions.params) {
            bodyData[item.key] = this.globalValue.hasOwnProperty(item.key) ? this.globalValue[item.key] : item.value;
        };

        const parameter: any[] = [{
            key: 'access_token',
            value: token,
        }];
           
        if(Object.keys(bodyData).length > 0){
            for(let  key in bodyData){
                parameter.push({
                    key:'data'+key,
                    value:bodyData[key]
                });
            }
        }
       

      

        if(this.dataFilter.length > 0){
            for(let dt of this.dataFilter){
                parameter.push({
                    key:'filter'+dt.field,
                    value:dt.value
                });
            }
        }
     

        if(this.orderBy.field){
            for(let key in this.orderBy){
                parameter.push({
                    key:'orderBy'+key,
                    value:this.orderBy[key]
                });
            }
    
        }
       
        parameter.push({
            key: 'limit',
            value: this.limit,
        },
        {
            key: 'skip',
            value: this.skip,
        }
        );

        
        const req = await this._globalService.runRequest('GET',this.schema.requestOptions.pathDownload, parameter);
       
        window.location.href = req.data;
    }

    getCellClass(value: number): string {
        if (value > 0) {
          return 'color-red'; // CSS class for values greater than 20
        }  else {
          return ''; // No additional CSS class for other values
        }
    }

    getTotalComplaint(fieldName) {

     
        if(fieldName=='Code'){
            return 'Total'
        }else if(fieldName > 0 || fieldName=='total'){
            return this.dataSource.map(t => t[fieldName]).reduce((acc, value) => parseInt(acc) + parseInt(value), 0);
        }else{
            return '';
        }
        
    }

}
