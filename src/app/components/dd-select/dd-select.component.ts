import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';

export interface IDDSelect {
    path: string;
    params: {
        key: string;
        value: any;
    }[];
    fields: {
        title: string;
        key: string;
    }[];
    defaultValue: any;
    title: string;
}

@Component({
    selector: 'app-dd-select',
    templateUrl: './dd-select.component.html',
    styleUrls: ['./dd-select.component.scss']
})
export class DdSelectComponent implements OnInit {

    title: string = '';
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
    showSpinner: boolean = true;
    // totalData: number = 0;
    skip: number = 0;
    dataFilter: any[] = [];
    orderBy: any = {
        field: '',
        value: '',
    };

    constructor(
        public _dialogRef: MatDialogRef<DdSelectComponent>,
        private _globalService: GlobalService,
        @Inject(MAT_DIALOG_DATA) public data: IDDSelect,
    ) { }

    async ngOnInit() {
        try {
            this.title = this.data.title;
            this.previewData = await this.getData();
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
        } catch (error) {
            this._globalService.showNotif(error.message);
        }
    }

    async getData() {
        try {
            this.showSpinner = true;
            const bodyData: any = {};
            for (const item of this.data.params) {
                bodyData[item.key] = item.value;
            };

            const body: any[] = [
                {
                    key: 'limit',
                    value: 10,
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
            const req = await this._globalService.runRequest('POST', this.data.path, [], body);
            const data: any[] = req.data;
            // this.totalData = req.total;
            return data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            this.showSpinner = false;
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
