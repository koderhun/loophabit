import {DayType, getDayColor} from '@/utils'

type Props = {
  dates: DayType[]
}
export const Habit = ({dates}: Props) => {
  return (
    <>
      <tr>
        <td className="sticky left-0 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
          John Doe
        </td>
        {dates.map((date, index) => (
          <td
            key={index}
            className={`border border-gray-300 px-4 py-2 dark:border-gray-600 ${getDayColor(date.day, date.isToday)}`}>
            Present
          </td>
        ))}
      </tr>
    </>
  )
}
