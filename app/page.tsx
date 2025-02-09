import {CalendarTable} from '@/components'

export default function Home() {
  return (
    <div className="mx-auto px-4">
      <h1 className="mb-4 text-2xl font-bold">Habit Calendar</h1>
      <CalendarTable />
    </div>
  )
}
