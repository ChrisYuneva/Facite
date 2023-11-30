export interface initialTypeCardList {
    toDoList: Task[],
    dbId: string,
    isLoading: boolean,
    errorMessage: string,
}

export interface Task {
    id?: string,
    content: string,
    priority: Priority,
    fulfillment: boolean,
    date: DateFormat,
    dateFullfilment?: DateFormat
}

export type Priority = 'default' |'urgently' | 'veryUrgently'

export interface DateFormat {
    day: number,
    month: number,
    week: number,
    year: number,
}