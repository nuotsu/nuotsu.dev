import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'

export default createClient(
	`https://${ env.PUBLIC_SUPABASE_URL }.supabase.co`,
	env.PUBLIC_SUPABASE_KEY
)
