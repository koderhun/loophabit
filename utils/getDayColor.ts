export const getDayColor = (day: string, isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}
