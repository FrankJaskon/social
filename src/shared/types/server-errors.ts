export interface ErrorData {
  statusCode: number
  message?: string
  field?: string
}

export interface ErrorType {
  data: ErrorData
  status: number
}

export interface Error400 {
  data: {
    errorsMessages: ErrorData[]
  }
  status: 400
}
