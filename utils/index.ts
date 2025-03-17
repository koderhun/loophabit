export const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export {generateDay} from './generateDay'
export type {DayType} from './generateDay'
