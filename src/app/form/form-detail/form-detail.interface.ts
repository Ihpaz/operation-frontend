export interface ISForm {
    id:number,
    tittle:string,
    remarks:string,
    questions:Questions[],
    answer:Answer[]
}

export interface Questions {
    id:number,
    QuestionName:string,
    QuestionType:string,
    Options:Options[],
}

export interface Options {
    id:number,
    label:string,
    value:string,
}

export interface Answer {
    id:number,
    QuestionName:string,
    QuestionType:string,
}