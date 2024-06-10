import { KeyOf } from '../types/general'

interface GetTranslationByKeyProps<T> {
  translationObj: T
  key?: string
}

export const getTranslationByKey = <T>({ translationObj, key }: GetTranslationByKeyProps<T>) => {
  return (key && translationObj[key as KeyOf<T>]) ?? key
}
