export const testimonials: {
	quote: string
	author: {
		name: string
		title: string
		avatar?: string
	}
	source?: string
}[] = [
	{
		quote:
			"This is sick dude. [...] Love seeing all the <strong>great work</strong> you're doing for <strong>the Sanity Community</strong>.",
		author: {
			name: 'Jono',
			title: 'Founder of Roboto Studio',
			avatar: 'https://avatars.githubusercontent.com/u/29231011?v=4',
		},
		source: 'https://github.com/nuotsu/sanitypress/discussions/65#discussioncomment-12237198',
	},
	{
		quote:
			'A really cool Sanity + Next.js starter template. Go check it out! 🔥 <strong>Really great work</strong>, Mitchell.',
		author: {
			name: 'Kapehe',
			title: 'Head of Developer Community @ Vercel',
			avatar: 'https://avatars.githubusercontent.com/u/30481405?v=4',
		},
		source: 'https://www.sanity.io/blog/community-digest-may-24-edition#84fd322ef040',
	},
	{
		quote:
			'Dude, Mitchell\'s a <em>crazy</em> dev 🤯. Check out his <a href="https://mlb.theohtani.com">MLB app</a>.',
		author: {
			name: 'Shota',
			title: 'Senior Software Engineer @ Salesforce',
		},
	},
]
