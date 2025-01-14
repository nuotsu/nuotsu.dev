import { structureTool } from 'sanity/structure'
import { singleton } from './lib/utils'
import { VscServerProcess } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site', 'Site').icon(VscServerProcess),
				S.divider(),

				S.documentTypeListItem('project'),
			]),
})
