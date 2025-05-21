import React from 'react'
import { structureTool } from 'sanity/structure'
import { singleton } from './utils'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { VscCodeOss } from 'react-icons/vsc'
import { VscVariableGroup } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S, context) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site').title('Site settings').icon(VscCodeOss),
				S.divider(),

				orderableDocumentListDeskItem({
					type: 'project',
					title: 'Projects',
					icon: VscVariableGroup,
					S,
					context,
				}),
			]),
})

export const icon = () => <img src="/icon.png" alt="" />
