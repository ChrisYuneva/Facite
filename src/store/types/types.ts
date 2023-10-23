export interface initialTypeCardList {
    toDoList: Task[],
    isLoading: boolean,
    errorMessage: string,
}

export interface Task {
    id?: string,
    content: string, 
    fulfillment: boolean,
    date: DateFormat
}

export interface DateFormat {
    day: number,
    month: number,
    week: number,
    year: number
}