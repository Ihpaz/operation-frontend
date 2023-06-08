import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IAlert {
    message: string;
    withInputText: boolean;
    inputTextName: string;
    inputTextLabel: string;
    inputType: string;
    justMessage: boolean;
    title: string;
    showForgotPasswordLink?: boolean;
}

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    title: string = '';
    message: string = '';
    withInputText: boolean = false;
    inputTextName: string = '';
    inputTextLabel: string = '';
    inputData: string = '';
    inputType: string = '';
    justMessage: boolean = false;
    showForgotPasswordLink: boolean = false;

    constructor(
        public _dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IAlert,
    ) { }

    ngOnInit(): void {
        this.title = this.data.title;
        this.message = this.data.message;
        this.withInputText = this.data.withInputText;
        if (this.withInputText) {
            this.inputTextName = this.data.inputTextName;
            this.inputTextLabel = this.data.inputTextLabel;
            this.inputType = this.data.inputType;
        }
        this.justMessage = this.data.justMessage;
        if (this.data.hasOwnProperty('showForgotPasswordLink')) {
            this.showForgotPasswordLink = this.data.showForgotPasswordLink;
        }
    }

    doForgotPassword() {
        const action = {
            "type": "request",
            "pageId": null,
            "widthModal": null,
            "params": [],
            "requestOptions": {
                "path": "compensation/forgot-password-payslip",
                "params": []
            },
            "confirmation": {
                "useConfirmation": false,
                "withInputText": true,
                "inputTextName": null,
                "inputTextLabel": null,
                "inputType": null,
                "message": null,
                "showForgotPasswordLink": false
            },
            "onSuccessRequest": {
                "type": "stay",
                "pageId": null,
                "loadTable": [],
                "alert": {
                    "useAlert": true,
                    "message": "Success send forgot password payslip"
                }
            },
            "viewFileKey": null,
            "showHideCondition": {
                "useShowHideCondition": false,
                "condition": {
                    "and": [

                    ],
                    "or": [

                    ]
                }
            }
        };
        this.doAction(true, true, action);
    }

    doAction(yesAction: boolean, forgotPasswordAction: boolean = false, action: any = {}) {
        if (yesAction && this.withInputText && !this.inputData && !this.showForgotPasswordLink) return;
        const actionData = {
            isYes: yesAction,
            withInputText: this.withInputText,
            forgotPasswordAction: forgotPasswordAction,
            forgotPasswordLinkAction: action,
        };
        if (this.withInputText) {
            actionData[this.inputTextName] = this.inputData;
        }
        this._dialogRef.close(actionData);
    }

    @HostListener('document:keydown.enter', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.doAction(true);
    }

}
