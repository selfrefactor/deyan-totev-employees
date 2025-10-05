import { filterObject, groupBy, head, mapObject, pipe, sort, tap } from 'rambda'

export interface Employee {
  EmpID: string
  DateFrom: string
  DateTo: string
  ProjectID: string
	employeeName?: string
	projectName?: string
}

interface EmployeeWithTimePeriod {
  id: string
  periods: { start: string; end: string }[]
}
function attachPeriodsToTeamMember(value: Employee[] | undefined): EmployeeWithTimePeriod[] {
	if (!value) return []
  const employeeGroups = value.reduce(
    (acc, employee) => {
      acc[employee.EmpID] = acc[employee.EmpID] || []
      acc[employee.EmpID].push(employee)
      return acc
    },
    {} as Record<string, Employee[]>,
  )

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

export function getTopCollaborationsBetweenTeamMembers(data: Employee[]): TopCollaborations[] {
	const result = pipe(
		data,
		groupBy(x => x.ProjectID),
		mapObject((employee) => attachPeriodsToTeamMember(employee)),
		mapObject((value, key) => getTopCollaborations(value, key)),
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

export interface TopCollaborations {
  companyName: string
  data: { EmpIDs: string[]; numberOfDays: number }
}

export function getTopCollaborations(value: EmployeeWithTimePeriod[], companyName: string): TopCollaborations[] {
  const collaborations: TopCollaborations[] = []

  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const emp1 = value[i]
      const emp2 = value[j]

      let totalCollaborationDays = 0

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
          companyName,
          data: {
            EmpIDs: [emp1.id, emp2.id],
            numberOfDays: totalCollaborationDays,
          },
        })
      }
    }
  }

  return collaborations.sort((a, b) => {
    if (b.data.numberOfDays === a.data.numberOfDays) return 0
		return b.data.numberOfDays > a.data.numberOfDays ? 1 : -1
  })
}

function getDaysBetween(DateFrom: string, DateTo: string): number {
  const start = new Date(DateFrom)
  const end = new Date(DateTo)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end date
}

function getOverlapPeriod(
  period1: { start: string; end: string },
  period2: { start: string; end: string },
): { start: string; end: string } | null {
  const start1 = new Date(period1.start)
  const end1 = new Date(period1.end)
  const start2 = new Date(period2.start)
  const end2 = new Date(period2.end)

  if (start1 <= end2 && start2 <= end1) {
    const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()))
    const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()))

    return {
      start: overlapStart.toISOString().split('T')[0],
      end: overlapEnd.toISOString().split('T')[0],
    }
  }

  return null
}

interface DateFormat {
	yearIndex: number
	monthIndex: number
	dayIndex: number
}

export function getDateFormat(input: Employee[]): DateFormat{
	const yearIndex = input[0].DateFrom.split('-').findIndex(x => x.length === 4)

	let foundMonthIndex: number | null = null
	let foundDayIndex: number | null = null


	for(let i = 0; i < input.length; i++){
		if(foundMonthIndex !== null) break

		const date = input[i].DateFrom.split('-')
		const [a,b] = date.filter((_,index) => index !== yearIndex)
		if(a.length !== 2 || b.length !== 2) continue
		if(Number(a) > 12){
			foundMonthIndex = date.indexOf(b)
			foundDayIndex = date.indexOf(a)
			break
		}
		if(Number(b) > 12){
			foundMonthIndex = date.indexOf(a)
			foundDayIndex = date.indexOf(b)
			break
		}
	}

	if(foundMonthIndex === null){
		return {yearIndex, monthIndex: 1, dayIndex: 2}
	}

	return {yearIndex, monthIndex: foundMonthIndex, dayIndex: foundDayIndex as number}
}

function normalizeDate(date: string, dateFormat: DateFormat){
	if(date === 'NULL') return new Date().toISOString().split('T')[0]
	const partsOfDate =date.split('-')

	return `${partsOfDate[dateFormat.yearIndex]}-${partsOfDate[dateFormat.monthIndex]}-${partsOfDate[dateFormat.dayIndex]}`
}

export function normalizeDateFormat(input: Employee[]){
	const dateFormat = getDateFormat(input)
	return input.map(item => ({
		...item,
		DateFrom: normalizeDate(item.DateFrom, dateFormat),
		DateTo: normalizeDate(item.DateTo, dateFormat),
	}))
}

