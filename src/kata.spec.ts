import { groupBy, head, mapObject, pipe, sort, sortObject } from 'rambda'
import { mainWorker, worker } from './worker'

const testData: Employee[] = [
  {
    employeeId: 'EMP001',
    employeeName: 'Smith',
    startDate: '2015-03-15',
    endDate: '2017-08-20',
    projectName: 'Cloud Migration',
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Johnson',
    startDate: '2016-01-10',
    endDate: '2018-12-05',
    projectName: 'Mobile App Development',
  },
  {
    employeeId: 'EMP001',
    employeeName: 'Smith',
    startDate: '2018-09-01',
    endDate: '2020-06-15',
    projectName: 'Data Analytics Platform',
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Williams',
    startDate: '2017-05-20',
    endDate: '2019-11-30',
    projectName: 'Cloud Migration',
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Brown',
    startDate: '2019-02-14',
    endDate: '2021-09-08',
    projectName: 'AI Chatbot System',
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Johnson',
    startDate: '2021-01-05',
    endDate: '2023-04-12',
    projectName: 'Mobile App Development',
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Davis',
    startDate: '2018-07-03',
    endDate: '2020-03-18',
    projectName: 'E-commerce Platform',
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Williams',
    startDate: '2020-08-15',
    endDate: '2022-12-01',
    projectName: 'Data Analytics Platform',
  },
  {
    employeeId: 'EMP006',
    employeeName: 'Miller',
    startDate: '2016-11-22',
    endDate: '2018-05-10',
    projectName: 'Cloud Migration',
  },
  {
    employeeId: 'EMP001',
    employeeName: 'Smith',
    startDate: '2021-10-01',
    endDate: '2024-02-28',
    projectName: 'AI Chatbot System',
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Brown',
    startDate: '2022-06-10',
    endDate: '2024-11-15',
    projectName: 'E-commerce Platform',
  },
  {
    employeeId: 'EMP007',
    employeeName: 'Wilson',
    startDate: '2015-09-08',
    endDate: '2017-04-25',
    projectName: 'Mobile App Development',
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Davis',
    startDate: '2020-12-01',
    endDate: '2023-07-20',
    projectName: 'Data Analytics Platform',
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Johnson',
    startDate: '2023-08-15',
    endDate: '2025-01-30',
    projectName: 'AI Chatbot System',
  },
  {
    employeeId: 'EMP008',
    employeeName: 'Moore',
    startDate: '2017-03-12',
    endDate: '2019-10-05',
    projectName: 'E-commerce Platform',
  },
  {
    employeeId: 'EMP006',
    employeeName: 'Miller',
    startDate: '2019-05-20',
    endDate: '2021-12-15',
    projectName: 'Cloud Migration',
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Williams',
    startDate: '2023-01-10',
    endDate: '2025-06-30',
    projectName: 'Mobile App Development',
  },
  {
    employeeId: 'EMP009',
    employeeName: 'Taylor',
    startDate: '2016-08-30',
    endDate: '2018-02-14',
    projectName: 'Data Analytics Platform',
  },
  {
    employeeId: 'EMP001',
    employeeName: 'Smith',
    startDate: '2024-03-01',
    endDate: '2025-12-31',
    projectName: 'E-commerce Platform',
  },
  {
    employeeId: 'EMP010',
    employeeName: 'Anderson',
    startDate: '2018-04-15',
    endDate: '2020-09-20',
    projectName: 'AI Chatbot System',
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Brown',
    startDate: '2015-12-01',
    endDate: '2017-07-10',
    projectName: 'Cloud Migration',
  },
  {
    employeeId: 'EMP007',
    employeeName: 'Wilson',
    startDate: '2021-11-05',
    endDate: '2024-03-15',
    projectName: 'Mobile App Development',
  },
  {
    employeeId: 'EMP011',
    employeeName: 'Thomas',
    startDate: '2019-07-22',
    endDate: '2022-01-08',
    projectName: 'Data Analytics Platform',
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Davis',
    startDate: '2023-09-01',
    endDate: '2025-05-20',
    projectName: 'AI Chatbot System',
  },
  {
    employeeId: 'EMP012',
    employeeName: 'Jackson',
    startDate: '2017-01-15',
    endDate: '2019-08-30',
    projectName: 'E-commerce Platform',
  },
]

interface Employee {
  employeeId: string
  employeeName: string
  startDate: string
  endDate: string
  projectName: string
}

interface Employeex {
  id: string
  name: string
  periods: { start: string; end: string }[]
}
function mergeMember(value: Employee[] | undefined): Employeex[] {
	if (!value) return []
  // Group by employeeId to merge multiple periods for the same employee
  const employeeGroups = value.reduce(
    (acc, employee) => {
      acc[employee.employeeId] = acc[employee.employeeId] || []
      acc[employee.employeeId].push(employee)
      return acc
    },
    {} as Record<string, Employee[]>,
  )

  // Transform each employee group into the desired format
  return Object.values(employeeGroups).map(employeeData => {
    return {
      id: employeeData[0].employeeId,
      name: employeeData[0].employeeName,
      periods: employeeData.map(record => ({
        start: record.startDate,
        end: record.endDate,
      })),
    }
  })
}


test('teams', () => {
  const teams = pipe(
    testData,
    groupBy(x => x.projectName),
    mapObject((employee) => mergeMember(employee)),
    mapObject((value, key) => worker(value, key)[0]),
		Object.values,
		sort((a, b) => {
			if (b.data.numberOfDays === a.data.numberOfDays) return 0
			return b.data.numberOfDays > a.data.numberOfDays ? 1 : -1
		}),
		head,
  )
	let result = mainWorker(testData)
	console.log(result)
})




test('worker', () => {
  const testInput = [
    {
      id: 'EMP004',
      name: 'Brown',
      periods: [{ start: '2019-02-14', end: '2021-09-08' }],
    },
    {
      id: 'EMP001',
      name: 'Smith',
      periods: [{ start: '2021-10-01', end: '2024-02-28' }],
    },
    {
      id: 'EMP002',
      name: 'Johnson',
      periods: [{ start: '2023-08-15', end: '2025-01-30' }],
    },
    {
      id: 'EMP010',
      name: 'Anderson',
      periods: [{ start: '2018-04-15', end: '2020-09-20' }],
    },
    {
      id: 'EMP005',
      name: 'Davis',
      periods: [{ start: '2023-09-01', end: '2025-05-20' }],
    },
  ]
  const result = worker(testInput, 'foo company')
  console.log(result)
})

// Test case 1: 3 pairs with same top result (all have 365 days collaboration)
test('3 pairs with same top result', () => {
  const testInput = [
    {
      id: 'EMP001',
      name: 'Alice',
      periods: [{ start: '2020-01-01', end: '2020-12-31' }], // 365 days
    },
    {
      id: 'EMP002',
      name: 'Bob',
      periods: [{ start: '2020-01-01', end: '2020-12-31' }], // 365 days overlap with Alice
    },
    {
      id: 'EMP003',
      name: 'Charlie',
      periods: [{ start: '2021-01-01', end: '2021-12-31' }], // 365 days
    },
    {
      id: 'EMP004',
      name: 'David',
      periods: [{ start: '2021-01-01', end: '2021-12-31' }], // 365 days overlap with Charlie
    },
    {
      id: 'EMP005',
      name: 'Eve',
      periods: [{ start: '2022-01-01', end: '2022-12-31' }], // 365 days
    },
    {
      id: 'EMP006',
      name: 'Frank',
      periods: [{ start: '2022-01-01', end: '2022-12-31' }], // 365 days overlap with Eve
    },
  ]
  const result = worker(testInput, 'SameTopResult Project')
  console.log('3 pairs with same top result:', result)
  // Expected: 3 pairs, each with 365 days collaboration
})

// Test case 2: No overlapping pairs (no employees worked together)
test('no overlapping pairs', () => {
  const testInput = [
    {
      id: 'EMP001',
      name: 'Alice',
      periods: [{ start: '2020-01-01', end: '2020-06-30' }], // Jan-Jun 2020
    },
    {
      id: 'EMP002',
      name: 'Bob',
      periods: [{ start: '2020-07-01', end: '2020-12-31' }], // Jul-Dec 2020 (no overlap)
    },
    {
      id: 'EMP003',
      name: 'Charlie',
      periods: [{ start: '2021-01-01', end: '2021-06-30' }], // Jan-Jun 2021 (no overlap)
    },
    {
      id: 'EMP004',
      name: 'David',
      periods: [{ start: '2021-07-01', end: '2021-12-31' }], // Jul-Dec 2021 (no overlap)
    },
  ]
  const result = worker(testInput, 'NoOverlap Project')
  console.log('No overlapping pairs:', result)
  // Expected: empty array (no collaborations)
})
