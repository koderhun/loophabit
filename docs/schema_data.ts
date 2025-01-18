
interface HabitType {
  name: string;
  count: number;
  type: 'boolean' | 'count' // boolean or count
}

interface LoopDataType {
  date: string;
  habits: HabitType[]
}

interface FullDataType {
  loops: LoopDataType[]
}

const data: FullDataType = {
  loops: [
    {
      date: '2022-01-01',
      habits: [
        {
          name: 'Reading',
          count: 3,
          type: 'boolean', // count
        },
        { name: 'Cooking', count: 2, type:  'boolean'},
        { name: 'Gardening', count: 1, type: 'boolean'}
      ],
    },
  ]
}