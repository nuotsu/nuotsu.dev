export function count(
	arr: any[] | number,
	singular: string = 'item',
	plural?: string,
) {
	const n = typeof arr === 'number' ? arr : (arr?.length ?? 0)
	return `${n || 0} ${n === 1 ? singular : plural || singular + 's'}`
}
