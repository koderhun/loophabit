'use client'
import React, {useState} from 'react'

interface Day {
  name: string
  comment: string
}

export const Week: React.FC = () => {
  const [days, setDays] = useState<Day[]>([
    {name: 'Sunday', comment: ''},
    {name: 'Monday', comment: ''},
    {name: 'Tuesday', comment: ''},
    {name: 'Wednesday', comment: ''},
    {name: 'Thursday', comment: ''},
    {name: 'Friday', comment: ''},
    {name: 'Saturday', comment: ''},
  ])

  const handleAddComment = (index: number) => {
    const newComment = prompt(
      `Add a comment for ${days[index].name}:`,
      days[index].comment,
    )
    if (newComment !== null) {
      const updatedDays = [...days]
      updatedDays[index].comment = newComment
      setDays(updatedDays)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">Week Days with Comments</h1>
      <div className="flex space-x-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex w-40 flex-col items-center rounded bg-white p-4 shadow-md">
            <h2 className="mb-2 text-lg font-bold">{day.name}</h2>
            <p className="mb-2 text-sm text-gray-700">
              {day.comment || 'No comment'}
            </p>
            <button
              onClick={() => handleAddComment(index)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Add Comment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
