export interface initialTypeUser {
    email: string,
    token: string,
    id: string
}

export interface User {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    email: any,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    token: any,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    id: any
}

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