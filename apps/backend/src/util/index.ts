import { getTime, isValid, fromUnixTime, format, addMonths, subHours, isDate, parse } from 'date-fns'
import { Between } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export * from './error'
export const generateEncodedUuid = () => Buffer.from(uuidv4()).toString('base64')

export const calcPaginationParam = (page?: number, perPage?: number): { skip?: number; take?: number } => {
  if (page && perPage) {
    return { skip: (page - 1) * perPage, take: perPage }
  }
  return { skip: 0, take: 10 }
}

export const datetime = {
  now: () => new Date(),
  nowUnixTimestampSec: () => datetime.getUnixTimestampSec(),
  threeMonthsLaterUnixTimestampSec: () => {
    const now = new Date()
    const threeMonthsLater = new Date()
    threeMonthsLater.setMonth(now.getMonth() + 3)
    return datetime.getUnixTimestampSec(threeMonthsLater)
  },
  oneHourLaterUnixTimestampSec: () => {
    const now = new Date()
    const oneHourLater = new Date()
    oneHourLater.setHours(now.getHours() + 1)
    return datetime.getUnixTimestampSec(oneHourLater)
  },
  getUnixTimestampSec: (date = new Date()) => Math.floor(getTime(date) / 1000),
  validateStr: (str: string) => isValid(new Date(str)),
  unixTimeToDate: (unixTimestamp: number) => fromUnixTime(unixTimestamp),
  formatDate: (timeZone: string, pattern: string) =>
    format(new Date(new Date().toLocaleString('en-US', { timeZone })), pattern),
  betweenMonth: (date: Date) => {
    return Between(Number((date.getTime() / 1000).toFixed()), Number((addMonths(date, 1).getTime() / 1000).toFixed()))
  },
  subHours: (hour: number) => datetime.getUnixTimestampSec(subHours(new Date(), hour)),
  toUnixtimeFromYYYYMMDD: (dateString?: string): number | undefined => {
    if (typeof dateString === 'undefined' || dateString === '') return undefined
    const date = parse(dateString, 'yyyy/MM/dd', new Date())
    if (!isDate(date)) {
      return undefined
    }
    return Math.floor(date.getTime() / 1000)
  }
}

export const uid = {
  new: () => uuidv4()
}

export const castNumber = (value?: string) => {
  if (typeof value === 'undefined') {
    return undefined
  }
  const num = Number(value.replace(/,/g, ''))
  if (isNaN(num)) return 0
  return num
}
