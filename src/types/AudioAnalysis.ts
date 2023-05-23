import type { Writable } from 'svelte/store'

export const fftSizes = [32,64,128,256,512,1024,2048,4096,8192,16384,32768] as const

declare global {
	namespace AudioAnalysis {
		type Analyzer = Writable<AnalyserNode | null>

		type FFT = typeof fftSizes[number]
	}
}

export {}
