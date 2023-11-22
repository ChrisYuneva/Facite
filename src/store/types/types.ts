export interface initialTypeUser {
    email: string,
    token: string,
    id: string
}

export interface User {
    email: string,
    token: string,
    id: string
}

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
    date: DateFormat
}

export type Priority = 'default' |'urgently' | 'veryUrgently'

export interface DateFormat {
    day: number,
    month: number,
    week: number,
    year: number,
}