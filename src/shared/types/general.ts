export type LocaleNameType = 'en' | 'ru'

export type KeyOf<T> = keyof T

export interface ServerErrorMessageType {
  message: string
  field: string
}
