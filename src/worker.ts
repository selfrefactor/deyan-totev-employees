import { groupBy, head, mapObject, pipe, sort, sortObject } from 'rambda'

export interface Employee {
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

export function mainWorker(data: Employee[]): TeamOutput[] {
	const result = pipe(
		data,
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
	return result
}

interface TeamOutput {
  name: string
  data: { employeeIds: string[]; numberOfDays: number }
}

export function worker(value: Employeex[], companyName: string): TeamOutput[] {
  const collaborations: TeamOutput[] = []

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
            employeeIds: [emp1.id, emp2.id],
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
function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
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

