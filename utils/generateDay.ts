export interface DayType {
  date: string // Дата в формате dd:mm:yy
  day: string // Название дня недели
  isToday: boolean // Флаг, указывающий, является ли день текущим
}

export const generateDay = (): DayType[] => {
  const dates: DayType[] = []
  const today = new Date()

  for (let i = 0; i <= 9; i++) {
    const currentDate = new Date()
    currentDate.setDate(today.getDate() - i)

    // Получаем название дня недели
    const dayName = currentDate.toLocaleDateString('ru-RU', {weekday: 'short'})

    // Форматируем дату в формате dd:mm:yy
    const day = String(currentDate.getDate()).padStart(2, '0') // День с ведущим нулем
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Месяц с ведущим нулем
    const year = String(currentDate.getFullYear()).slice(-2) // Последние 2 цифры года

    dates.push({
      date: `${day}.${month}.${year}`, // Форматируем дату
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1), // Делаем первую букву заглавной
      isToday: today.toDateString() === currentDate.toDateString(), // Проверяем, является ли день текущим
    })
  }

  // Сортируем даты по убыванию
  return dates.sort((a, b) => {
    return (
      new Date(a.date.split('.').reverse().join('-')).getTime() -
      new Date(b.date.split('.').reverse().join('-')).getTime()
    )
  })
}
