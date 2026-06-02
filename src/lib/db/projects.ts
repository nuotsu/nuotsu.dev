export const projects: {
	title: string
	url: string
	year: number
	repo?: string[]
}[] = [
	// personal
	{
		title: 'SanityPress',
		url: 'https://sanitypress.dev',
		year: 2026,
		repo: ['sanitypress', 'sanitypress-2023'],
	},
	{
		title: 'MLB Live Scorebug',
		url: 'https://mlb.theohtani.com',
		year: 2026,
		repo: ['mlb'],
	},
	// {
	// 	title: "MLB Live Scorebug ('25)",
	// 	url: 'https://sb3.theohtani.com',
	// 	year: 2025,
	// },
	// {
	// 	title: "MLB Live Scorebug ('24)",
	// 	url: 'https://sb2.theohtani.com',
	// 	year: 2024,
	// },
	// {
	// 	title: "MLB Live Scorebug ('23)",
	// 	url: 'https://sb2.theohtani.com',
	// 	year: 2023,
	// },
	{
		title: 'The Ohtani',
		url: 'https://theohtani.com',
		year: 2025,
	},

	// freelance
	{
		title: 'CUSCO USA',
		url: 'https://cuscousainc.com',
		year: 2021,
	},
	// {
	// 	title: 'ECL Americas',
	// 	url: 'https://eclamericas.com',
	// 	year: 2020,
	// },
	// {
	// 	title: 'Attention Monsters',
	// 	url: 'https://attentionmonsters.com',
	// 	year: 2023,
	// },
	// {
	// 	title: 'Topspin Coach',
	// 	url: 'https://topspincoach.vercel.app',
	// 	year: 2026,
	// },

	// Human
	{
		title: 'Human Marketing',
		url: 'https://human.marketing',
		year: 2024,
	},
	// {
	// 	title: 'Vibrant Health',
	// 	url: 'https://vibranthealth.com',
	// 	year: 2026,
	// },
	// {
	// 	title: 'Covenant Philanthropic Solutions',
	// 	url: 'https://covenantfirm.com',
	// 	year: 2026,
	// },
	// {
	// 	title: 'Agility Partners',
	// 	url: 'https://agilitypartners.com',
	// 	year: 2025,
	// },
	// {
	// 	title: 'CPS Private Client Solutions',
	// 	url: 'https://cpsprivateclientsolutions.com',
	// 	year: 2024,
	// },
	// {
	// 	title: 'Atomic Widgets',
	// 	url: 'https://atomicwidgets.com',
	// 	year: 2023,
	// },
	// {
	// 	title: 'FASTECH',
	// 	url: 'https://fastechus.com',
	// 	year: 2021,
	// },
].toSorted((a, b) => b.year - a.year)
