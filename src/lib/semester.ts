import { addWeeks, isMonday, nextMonday } from 'date-fns'

/**
 * Returns the 3rd Monday of March for the given year.
 */
function getThirdMondayOfMarch(year: number): Date {
	const marchFirst = new Date(year, 2, 1)
	const firstMonday = isMonday(marchFirst) ? marchFirst : nextMonday(marchFirst)
	return addWeeks(firstMonday, 2)
}

/**
 * Returns the current semester string based on today's date.
 *
 * - **Sommersemester (SS):** from the 3rd Monday of March until September 30th
 *   → format `SS<YY>` (e.g. `SS26`)
 * - **Wintersemester (WS):** from October 1st until the 3rd Monday of March
 *   → format `WS<YY>/<YY>` (e.g. `WS25/26`)
 */
export function getCurrentSemester(now: Date = new Date()): string {
	const year = now.getFullYear()
	const thirdMondayOfMarch = getThirdMondayOfMarch(year)
	const october1st = new Date(year, 9, 1)

	if (now >= thirdMondayOfMarch && now < october1st) {
		// Sommersemester
		const shortYear = String(year).slice(-2)
		return `SS${shortYear}`
	}

	// Wintersemester
	if (now >= october1st) {
		// Oct – Dec → WS current/next
		const shortYear = String(year).slice(-2)
		const shortNextYear = String(year + 1).slice(-2)
		return `WS${shortYear}/${shortNextYear}`
	}

	// Jan – before 3rd Monday of March → WS prev/current
	const shortPrevYear = String(year - 1).slice(-2)
	const shortYear = String(year).slice(-2)
	return `WS${shortPrevYear}/${shortYear}`
}
