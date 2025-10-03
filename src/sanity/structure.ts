import { structureTool } from 'sanity/structure'
import { VscChip } from 'react-icons/vsc'
import { singleton } from './lib/builders'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				S.divider().title('Global'),
				singleton(S, 'global').icon(VscChip),
			]),
})
