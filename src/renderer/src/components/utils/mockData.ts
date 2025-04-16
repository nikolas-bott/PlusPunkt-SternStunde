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

export const MOCK_DATA = {
  SUBJECTS,

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
      title: 'Homework 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: '2023-10-01',
      status: 'open'
    },
    {
      subject: SUBJECTS.MATH,
      title: 'Homework 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: '2023-10-02',
      status: 'open'
    },
    {
      subject: SUBJECTS.GERMAN,
      title: 'Homework 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dueDate: '2023-10-03',
      status: 'open'
    }
  ]
}
