import { createClient } from '@vercel/edge-config'
import { EDGE_CONFIG } from '$env/static/private'

export const db = createClient(EDGE_CONFIG)
