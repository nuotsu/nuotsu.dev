import { structureTool } from 'sanity/structure'
import { VscChip, VscBriefcase, VscGlobe } from 'react-icons/vsc'
import { singleton } from './lib/builders'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				S.divider().title('Global'),
				singleton(S, 'global').icon(VscChip),

				S.divider().title('Archive'),
				S.documentTypeListItem('project').title('Projects').icon(VscBriefcase),
				S.documentTypeListItem('domain').title('Domains').icon(VscGlobe),
			]),
})
