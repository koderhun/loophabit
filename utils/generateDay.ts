interface Day {
  date: string // Дата в формате ISO (YYYY-MM-DD)
  day: string // Название дня недели
  isToday: boolean // Флаг, указывающий, является ли день текущим
}

export const generateDay = (): Day[] => {
  const dates: Day[] = []
  const today = new Date()

  for (let i = 9; i >= 0; i--) {
    const currentDate = new Date()
    currentDate.setDate(today.getDate() - i)

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    dates.push({
      date: currentDate.toISOString().split('T')[0], // Форматируем дату в ISO
      day: dayNames[currentDate.getDay()], // Получаем название дня недели
      isToday: today.toDateString() === currentDate.toDateString(), // Проверяем, является ли день текущим
    })
  }

  // Сортируем даты по убыванию
  return dates.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
