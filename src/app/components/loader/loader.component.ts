import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';


@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    constructor(
        public _dialogRef: MatDialogRef<LoaderComponent>,
        private _globalService: GlobalService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this._globalService.eventDestroy('global:showLoader');
        this._globalService.eventSubscribe('global:showLoader', (showLoader: boolean) => {
            if (!showLoader) {
                this._dialogRef.close();
            }
        });
    }

}
