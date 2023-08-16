import { IAction, IRequestOptions, IShowHideCondition } from "../widget.interface";

export interface ISAWTableDyn {
    name: string;
    pageSize: number[];
    requestOptions: IRequestOptions;
    useFilterFields: boolean;
    useDownloadPdfButton: boolean;
    width: string;
    height: string;
    withCheckbox?: boolean;
    checkBoxShowHideCondition?: IShowHideCondition;
    checkBoxId: string;
    IsHide: boolean;
    fields: {
        name: string;
        title: string;
        width: number;
        canOrder: boolean;
        isSticky: boolean;
        filterOptions: {
            canFilter: boolean;
            filterType: 'text' | 'select' | 'date';
            filterSelect: {
                path: string;
                params: {
                    key: string;
                    value: any;
                }[];
                paramsCanNull?: boolean;
                field: {
                    value: string;
                    label: string;
                }
            };
        };
        styleOptionsName: string;
    }[];
    fieldActions: {
        title: string;
        icon: string;
        width: string;
        action: IAction;
    }[];
    forMobile: {
        leftField: {
            title: string;
            subtitle: string;
            miniSubtitle: string;
        };
        rightField: {
            title: string;
            subtitle: string;
            miniSubtitle: string;
        };
        height: string;
        useAction: boolean;
        withBackground: boolean;
        actions: {
            title: string;
            icon: string;
            width: string;
            action: IAction;
        }[];
    };
}
