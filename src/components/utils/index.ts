import dayjs from 'dayjs'

export const parseTimeSlot = (time: string | undefined): string | undefined => {
  try {
    return dayjs(time, 'HH:mm:ss').format('HH:mm')
  } catch (error: any) {
    return undefined
  }
}
