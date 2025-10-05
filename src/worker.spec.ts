import { getTopCollaborationsBetweenTeamMembers, Employee, getDateFormat } from './worker'

test('one result', () => {
	const testInput: Employee[] = [
  {
    EmpID: 'EMP001',
    employeeName: 'Smith',
    DateFrom: '2015-03-15',
    DateTo: '2017-08-20',
    ProjectID: 'Cloud Migration',
  },
  {
    EmpID: 'EMP002',
    employeeName: 'Johnson',
    DateFrom: '2016-01-10',
    DateTo: '2018-12-05',
    ProjectID: 'Mobile App Development',
  },
  {
    EmpID: 'EMP001',
    employeeName: 'Smith',
    DateFrom: '2018-09-01',
    DateTo: '2020-06-15',
    ProjectID: 'Data Analytics Platform',
  },
  {
    EmpID: 'EMP003',
    employeeName: 'Williams',
    DateFrom: '2017-05-20',
    DateTo: '2019-11-30',
    ProjectID: 'Cloud Migration',
  },
  {
    EmpID: 'EMP004',
    employeeName: 'Brown',
    DateFrom: '2019-02-14',
    DateTo: '2021-09-08',
    ProjectID: 'AI Chatbot System',
  },
  {
    EmpID: 'EMP002',
    employeeName: 'Johnson',
    DateFrom: '2021-01-05',
    DateTo: '2023-04-12',
    ProjectID: 'Mobile App Development',
  },
  {
    EmpID: 'EMP005',
    employeeName: 'Davis',
    DateFrom: '2018-07-03',
    DateTo: '2020-03-18',
    ProjectID: 'E-commerce Platform',
  },
  {
    EmpID: 'EMP003',
    employeeName: 'Williams',
    DateFrom: '2020-08-15',
    DateTo: '2022-12-01',
    ProjectID: 'Data Analytics Platform',
  },
  {
    EmpID: 'EMP006',
    employeeName: 'Miller',
    DateFrom: '2016-11-22',
    DateTo: '2018-05-10',
    ProjectID: 'Cloud Migration',
  },
  {
    EmpID: 'EMP001',
    employeeName: 'Smith',
    DateFrom: '2021-10-01',
    DateTo: '2024-02-28',
    ProjectID: 'AI Chatbot System',
  },
  {
    EmpID: 'EMP004',
    employeeName: 'Brown',
    DateFrom: '2022-06-10',
    DateTo: '2024-11-15',
    ProjectID: 'E-commerce Platform',
  },
  {
    EmpID: 'EMP007',
    employeeName: 'Wilson',
    DateFrom: '2015-09-08',
    DateTo: '2017-04-25',
    ProjectID: 'Mobile App Development',
  },
  {
    EmpID: 'EMP005',
    employeeName: 'Davis',
    DateFrom: '2020-12-01',
    DateTo: '2023-07-20',
    ProjectID: 'Data Analytics Platform',
  },
  {
    EmpID: 'EMP002',
    employeeName: 'Johnson',
    DateFrom: '2023-08-15',
    DateTo: '2025-01-30',
    ProjectID: 'AI Chatbot System',
  },
  {
    EmpID: 'EMP008',
    employeeName: 'Moore',
    DateFrom: '2017-03-12',
    DateTo: '2019-10-05',
    ProjectID: 'E-commerce Platform',
  },
  {
    EmpID: 'EMP006',
    employeeName: 'Miller',
    DateFrom: '2019-05-20',
    DateTo: '2021-12-15',
    ProjectID: 'Cloud Migration',
  },
  {
    EmpID: 'EMP003',
    employeeName: 'Williams',
    DateFrom: '2023-01-10',
    DateTo: '2025-06-30',
    ProjectID: 'Mobile App Development',
  },
  {
    EmpID: 'EMP009',
    employeeName: 'Taylor',
    DateFrom: '2016-08-30',
    DateTo: '2018-02-14',
    ProjectID: 'Data Analytics Platform',
  },
  {
    EmpID: 'EMP001',
    employeeName: 'Smith',
    DateFrom: '2024-03-01',
    DateTo: '2025-12-31',
    ProjectID: 'E-commerce Platform',
  },
  {
    EmpID: 'EMP010',
    employeeName: 'Anderson',
    DateFrom: '2018-04-15',
    DateTo: '2020-09-20',
    ProjectID: 'AI Chatbot System',
  },
  {
    EmpID: 'EMP004',
    employeeName: 'Brown',
    DateFrom: '2015-12-01',
    DateTo: '2017-07-10',
    ProjectID: 'Cloud Migration',
  },
  {
    EmpID: 'EMP007',
    employeeName: 'Wilson',
    DateFrom: '2021-11-05',
    DateTo: '2024-03-15',
    ProjectID: 'Mobile App Development',
  },
  {
    EmpID: 'EMP011',
    employeeName: 'Thomas',
    DateFrom: '2019-07-22',
    DateTo: '2022-01-08',
    ProjectID: 'Data Analytics Platform',
  },
  {
    EmpID: 'EMP005',
    employeeName: 'Davis',
    DateFrom: '2023-09-01',
    DateTo: '2025-05-20',
    ProjectID: 'AI Chatbot System',
  },
  {
    EmpID: 'EMP012',
    employeeName: 'Jackson',
    DateFrom: '2017-01-15',
    DateTo: '2019-08-30',
    ProjectID: 'E-commerce Platform',
  },
]
	let result = getTopCollaborationsBetweenTeamMembers(testInput)
	expect(result.length).toEqual(1)
})



test('three pairs with same top result', () => {
  const testInput: Employee[] = [
    {
      EmpID: 'EMP001',
      employeeName: 'Alice',
      DateFrom: '2020-01-01',
      DateTo: '2020-12-30',
      ProjectID: 'Project Alpha',
    },
    {
      EmpID: 'EMP002',
      employeeName: 'Bob',
      DateFrom: '2020-01-01',
      DateTo: '2020-12-31',
      ProjectID: 'Project Alpha',
    },
    {
      EmpID: 'EMP003',
      employeeName: 'Charlie',
      DateFrom: '2021-01-01',
      DateTo: '2021-12-31',
      ProjectID: 'Project Beta',
    },
    {
      EmpID: 'EMP004',
      employeeName: 'David',
      DateFrom: '2021-01-01',
      DateTo: '2021-12-31',
      ProjectID: 'Project Beta',
    },
    {
      EmpID: 'EMP005',
      employeeName: 'Eve',
      DateFrom: '2022-01-01',
      DateTo: '2022-12-31',
      ProjectID: 'Project Gamma',
    },
    {
      EmpID: 'EMP006',
      employeeName: 'Frank',
      DateFrom: '2022-01-01',
      DateTo: '2022-12-31',
      ProjectID: 'Project Gamma',
    },
  ]
	let result = getTopCollaborationsBetweenTeamMembers(testInput)
  expect(result.length).toEqual(3)
})

test('no overlapping pairs', () => {
  const testInput: Employee[] = [
    {
      EmpID: 'EMP001',
      employeeName: 'Alice',
      DateFrom: '2020-01-01',
      DateTo: '2020-06-30',
      ProjectID: 'Project Alpha',
    },
    {
      EmpID: 'EMP002',
      employeeName: 'Bob',
      DateFrom: '2020-07-01',
      DateTo: '2020-12-31',
      ProjectID: 'Project Alpha',
    },
    {
      EmpID: 'EMP003',
      employeeName: 'Charlie',
      DateFrom: '2021-01-01',
      DateTo: '2021-06-30',
      ProjectID: 'Project Beta',
    },
    {
      EmpID: 'EMP004',
      employeeName: 'David',
      DateFrom: '2021-07-01',
      DateTo: '2021-12-31',
      ProjectID: 'Project Beta',
    },
  ]
	let result = getTopCollaborationsBetweenTeamMembers(testInput)
  expect(result.length).toEqual(0)
})

test('date format - use fallback if no month or day is found', () => {
  const testInput: Employee[] = [
    {
      EmpID: 'EMP001',
      employeeName: 'Alice',
      DateFrom: '2020-01-01',
      DateTo: '2020-12-31',
      ProjectID: 'Project Alpha',
    },
  ]
	expect(getDateFormat(testInput)).toEqual({yearIndex: 0, monthIndex: 1, dayIndex: 2})
})

test('date format - use month and day if found - case 1', () => {
  const testInput: Employee[] = [
    {
      EmpID: 'EMP001',
      employeeName: 'Alice',
      DateFrom: '01-14-2020',
      DateTo: '2020-12-31',
      ProjectID: 'Project Alpha',
    },
  ]
  expect(getDateFormat(testInput)).toEqual({yearIndex: 2, monthIndex: 0, dayIndex: 1})
})

test('date format - use month and day if found - case 2', () => {
  const testInput: Employee[] = [
    {
      EmpID: 'EMP001',
      employeeName: 'Alice',
      DateFrom: '2020-01-14',
      DateTo: '2020-12-31',
      ProjectID: 'Project Alpha',
    },
  ]
  expect(getDateFormat(testInput)).toEqual({yearIndex: 0, monthIndex: 1, dayIndex: 2})
})


