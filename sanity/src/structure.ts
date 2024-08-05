import type { StructureResolver } from 'sanity/structure'
import { list } from './utils'
import { orderableDocumentListDeskItem as orderable } from '@sanity/orderable-document-list'
import { CaseIcon } from '@sanity/icons'
import { RxImage } from 'react-icons/rx'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([
			list(S, 'Projects', 'project').icon(CaseIcon),
			orderable({
				type: 'midjourney',
				title: 'Midjourney images',
				S,
				context,
				icon: RxImage,
			}),
		])

export default structure
