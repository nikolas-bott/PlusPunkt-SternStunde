// Define subjects separately to avoid circular reference
export const SUBJECTS = {
  MATH: {
    name: 'Math',
    nameAbbreviation: 'Math',
    color: '#4965A2',
    teacher: 'Frau Wesenfeldt'
  },
  BIOLOGY: {
    name: 'Biology',
    nameAbbreviation: 'Bio',
    color: '#49A283',
    teacher: 'Herr Dreyer'
  },
  GERMAN: {
    name: 'German',
    nameAbbreviation: 'Ger',
    color: '#A24955',
    teacher: 'Herr Dreyer'
  },
  PHYSICS: {
    name: 'Physics',
    nameAbbreviation: 'Phy',
    color: '#2E6652',
    teacher: 'Herr Dreyer'
  },
  GEOGRAPHY: {
    name: 'Geography',
    nameAbbreviation: 'Geo',
    color: '#969C46',
    teacher: 'Herr Polzin'
  },
  INFORMATICS: {
    name: 'Informatics',
    nameAbbreviation: 'Inf',
    color: '#8B5CF6',
    teacher: 'Frau Knabe'
  }
}

// Define exam types
export interface ExamType {
  id: string
  title: string
  date: string
  type: 'Written' | 'Oral'
  status: 'upcoming' | 'done'
  grade?: number
  subject: (typeof SUBJECTS)[keyof typeof SUBJECTS]
}

// Define exams data
export const EXAMS: ExamType[] = [
  {
    id: '1',
    title: 'Klausur - Die Zelle',
    date: 'Donnerstag, Oktober 14, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '2',
    title: 'Mündlich',
    date: 'Donnerstag, Oktober 14, 2025',
    type: 'Oral',
    status: 'upcoming',
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '3',
    title: 'Klausur - Ökologie',
    date: 'Donnerstag, März 14, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '4',
    title: 'Test - Fortpflanzung',
    date: 'Donnerstag, April 11, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '5',
    title: 'Klausur - Evolution',
    date: 'Donnerstag, Februar 18, 2025',
    type: 'Written',
    status: 'done',
    grade: 13,
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '6',
    title: 'Klausur - Genetik',
    date: 'Donnerstag, Januar 10, 2025',
    type: 'Written',
    status: 'done',
    grade: 10,
    subject: SUBJECTS.BIOLOGY
  },
  {
    id: '7',
    title: 'Klausur - Vektorrechnung',
    date: 'Dienstag, November 5, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.MATH
  },
  {
    id: '8',
    title: 'Klausur - Integralrechnung',
    date: 'Freitag, Dezember 12, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.MATH
  },
  {
    id: '9',
    title: 'Mündliche Prüfung',
    date: 'Mittwoch, Januar 15, 2026',
    type: 'Oral',
    status: 'upcoming',
    subject: SUBJECTS.GERMAN
  },
  {
    id: '10',
    title: 'Klausur - Kraftgesetze',
    date: 'Montag, November 18, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.PHYSICS
  },
  {
    id: '11',
    title: 'Klausur - Deutschland',
    date: 'Freitag, Oktober 25, 2025',
    type: 'Written',
    status: 'upcoming',
    subject: SUBJECTS.GEOGRAPHY
  },
  {
    id: '12',
    title: 'Klausur - Algorithmen',
    date: 'Donnerstag, September 19, 2025',
    type: 'Written',
    status: 'done',
    grade: 15,
    subject: SUBJECTS.INFORMATICS
  },
  {
    id: '13',
    title: 'Klausur - Datenstrukturen',
    date: 'Montag, März 3, 2025',
    type: 'Written',
    status: 'done',
    grade: 14,
    subject: SUBJECTS.INFORMATICS
  }
]

export const MOCK_DATA = {
  SUBJECTS,
  EXAMS,

  GRADES_SUBJECTS: [
    {
      subject: SUBJECTS.BIOLOGY,
      average: 12.5,
      development: -2.5,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.MATH,
      average: 14.2,
      development: 1.14,
      hoursAWeek: 6
    },
    {
      subject: SUBJECTS.INFORMATICS,
      average: 12.5,
      development: +1.5,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.GERMAN,
      average: 8.25,
      development: -2.14,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.GEOGRAPHY,
      average: 9.5,
      development: 0,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.BIOLOGY,
      average: 12.5,
      development: 1.5,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.PHYSICS,
      average: 12.5,
      development: -1.5,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.BIOLOGY,
      average: 12.5,
      development: 3.5,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.PHYSICS,
      average: 13.33,
      development: 3.54,
      hoursAWeek: 3
    },
    {
      subject: SUBJECTS.GERMAN,
      average: 8.25,
      development: -2.14,
      hoursAWeek: 3
    }
  ],
  HOMEWORK: [
    {
      subject: SUBJECTS.BIOLOGY,
      title: 'Buch S.43 nr.4',
      notes: '',
      dueDate: new Date('2023-10-01'),
      status: 'open',
      id: '1'
    },
    {
      subject: SUBJECTS.MATH,
      title: 'Homework 2',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: new Date('2023-8-01'),
      status: 'open',
      id: '2'
    },
    {
      subject: SUBJECTS.GERMAN,
      title: 'Homework 3',
      notes: '',
      dueDate: new Date('2023-6-01'),
      status: 'open',
      id: '3'
    },
    {
      subject: SUBJECTS.INFORMATICS,
      title: 'Homework 4',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: new Date('2025-7-19'),
      status: 'open',
      id: '4'
    },
    {
      subject: SUBJECTS.GERMAN,
      title: 'Homework 3',
      notes: '',
      dueDate: new Date('2023-6-01'),
      status: 'open',
      id: '5'
    },
    {
      subject: SUBJECTS.INFORMATICS,
      title: 'Homework 4',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: new Date('2025-7-19'),
      status: 'open',
      id: '6'
    },
    {
      subject: SUBJECTS.PHYSICS,
      title: 'Homework 3',
      notes: '',
      dueDate: new Date('2023-6-01'),
      status: 'done',
      id: '7'
    }
  ]
}
