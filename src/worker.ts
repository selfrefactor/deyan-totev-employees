import { filterObject, groupBy, head, mapObject, pipe, sort, sortObject, tap } from 'rambda'

export interface Employee {
  EmpID: string
  DateFrom: string
  DateTo: string
  projectID: string
}

interface EmployeeWithTimePeriod {
  id: string
  periods: { start: string; end: string }[]
}
function mergeMember(value: Employee[] | undefined): EmployeeWithTimePeriod[] {
	if (!value) return []
  // Group by EmpID to merge multiple periods for the same employee
  const employeeGroups = value.reduce(
    (acc, employee) => {
      acc[employee.EmpID] = acc[employee.EmpID] || []
      acc[employee.EmpID].push(employee)
      return acc
    },
    {} as Record<string, Employee[]>,
  )

  // Transform each employee group into the desired format
  return Object.values(employeeGroups).map(employeeData => {
    return {
      id: employeeData[0].EmpID,
      periods: employeeData.map(record => ({
        start: record.DateFrom,
        end: record.DateTo,
      })),
    }
  })
}

export function mainWorker(data: Employee[]): OverlappingDaysResult[] {
	
	const result = pipe(
		data,
		groupBy(x => x.projectID),
		mapObject((employee) => mergeMember(employee)),
		mapObject((value, key) => worker(value, key)),
		tap(x =>{
			x
		}),
		filterObject((value) => value.length > 0),
		mapObject(head),
		x => Object.values(x),
		sort((a, b) => {
			if (b.data.numberOfDays === a.data.numberOfDays) return 0
			return b.data.numberOfDays > a.data.numberOfDays ? 1 : -1
		}),
		data => ({data, topResult: head(data)?.data.numberOfDays ?? 0}),
		({data, topResult}) => topResult === 0 ? [] :data.filter(x => x.data.numberOfDays === topResult),
	)
	return result
}

// export function mainWorker(data: Employee[]): OverlappingDaysResult[] {
// 	function assertTeamMember(value: OverlappingDaysResult | null): value is OverlappingDaysResult {
// 		return value !== null
// 	}
	
// 	const result = pipe(
// 		data,
// 		groupBy(x => x.projectID),
// 		mapObject((employee) => mergeMember(employee)),
// 		mapObject((value, key) => {
// 			let result = worker(value, key)
// 			return result.length > 0 ? result[0] : null
// 		}),
// 		tap(x =>{
// 			x
// 		}),
// 		filterObject(assertTeamMember),
// 		tap(x =>{
// 			x
// 		}),
// 		x => Object.values(x),
// 		sort((a, b) => {
// 			if (b.data.numberOfDays === a.data.numberOfDays) return 0
// 			return b.data.numberOfDays > a.data.numberOfDays ? 1 : -1
// 		}),
// 		data => ({data, topResult: head(data)?.data.numberOfDays ?? 0}),
// 		({data, topResult}) => topResult === 0 ? [] :data.filter(x => x.data.numberOfDays === topResult),
// 	)
// 	return result
// }

export interface OverlappingDaysResult {
  name: string
  data: { EmpIDs: string[]; numberOfDays: number }
}

export function worker(value: EmployeeWithTimePeriod[], companyName: string): OverlappingDaysResult[] {
  const collaborations: OverlappingDaysResult[] = []

  // Generate all pairs of employees (permutations)
  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const emp1 = value[i]
      const emp2 = value[j]

      let totalCollaborationDays = 0

      // Check all combinations of periods between the two employees
      emp1.periods.forEach(period1 => {
        emp2.periods.forEach(period2 => {
          const overlap = getOverlapPeriod(period1, period2)
          if (overlap) {
            totalCollaborationDays += getDaysBetween(overlap.start, overlap.end)
          }
        })
      })

      if (totalCollaborationDays > 0) {
        collaborations.push({
          name: companyName,
          data: {
            EmpIDs: [emp1.id, emp2.id],
            numberOfDays: totalCollaborationDays,
          },
        })
      }
    }
  }

  // Sort by number of days descending, then by name ascending
  return collaborations.sort((a, b) => {
    if (b.data.numberOfDays !== a.data.numberOfDays) {
      return b.data.numberOfDays - a.data.numberOfDays
    }
    return a.name.localeCompare(b.name)
  })
}

// Helper function to calculate days between dates
function getDaysBetween(DateFrom: string, DateTo: string): number {
  const start = new Date(DateFrom)
  const end = new Date(DateTo)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end date
}

// Helper function to check if two periods overlap and return overlap period
function getOverlapPeriod(
  period1: { start: string; end: string },
  period2: { start: string; end: string },
): { start: string; end: string } | null {
  const start1 = new Date(period1.start)
  const end1 = new Date(period1.end)
  const start2 = new Date(period2.start)
  const end2 = new Date(period2.end)

  // Check if periods overlap
  if (start1 <= end2 && start2 <= end1) {
    // Calculate overlap period
    const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()))
    const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()))

    return {
      start: overlapStart.toISOString().split('T')[0],
      end: overlapEnd.toISOString().split('T')[0],
    }
  }

  return null
}

