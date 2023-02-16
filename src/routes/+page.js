import supabase from '@/lib/supabase'

export async function load() {
	const { data: [reactions] } = await supabase
		.from('reactions')
		.select('name, count')
		.eq('name', 'website')

	return {
		reactions
	}
}
