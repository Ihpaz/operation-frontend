import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dd-timepicker',
    templateUrl: './dd-timepicker.component.html',
    styleUrls: ['./dd-timepicker.component.scss']
})
export class DdTimepickerComponent implements OnInit {

    valueLeft: string = '00';
    valueRight: string = '00';

    dataLeft: string[] = [];
    dataRight: string[] = [];

    constructor(
        public _dialogRef: MatDialogRef<DdTimepickerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        if (this.data.value) {
            this.valueLeft = this.data.value.substring(0, 2);
            this.valueRight = this.data.value.substring(3, 5);
        }

        for (let i = 0; i < 24; i++) {
            const time = i.toString().length === 1 ? `0${i}` : `${i}`;
            this.dataLeft.push(time);
        }

        for (let i = 0; i < 60; i++) {
            const time = i.toString().length === 1 ? `0${i}` : `${i}`;
            this.dataRight.push(time);
        }
    }

    doAction() {
        const finalValue = `${this.valueLeft}:${this.valueRight}`;
        this._dialogRef.close(finalValue);
    }

}
