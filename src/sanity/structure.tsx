import React from 'react'
import { structureTool } from 'sanity/structure'
import { singleton } from './lib/utils'
import { VscCodeOss } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site').title('Site settings').icon(VscCodeOss),
				S.divider(),

				S.documentTypeListItem('domain').title('Domains'),
				S.documentTypeListItem('project').title('Projects'),
				S.documentTypeListItem('writing').title('Writings'),
			]),
})

export const icon = () => <img src="/icon.png" alt="" />
