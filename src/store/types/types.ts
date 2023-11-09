export interface initialTypeCardList {
    toDoList: Task[],
    isLoading: boolean,
    errorMessage: string,
}

export interface Task {
    id?: string,
    content: string,
    priority: Priority,
    fulfillment: boolean,
    date: DateFormat
}

export type Priority = 'default' |'urgently' | 'veryUrgently'

export interface DateFormat {
    day: number,
    month: number,
    week: number,
    year: number,
}