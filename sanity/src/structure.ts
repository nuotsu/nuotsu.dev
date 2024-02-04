import type { StructureResolver } from 'sanity/structure'
import { list } from './utils'
import { CaseIcon } from '@sanity/icons'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([list(S, 'Projects', 'project').icon(CaseIcon)])

export default structure
