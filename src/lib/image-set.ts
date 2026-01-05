export type Picture = {
	img: {
		src: string
		sizes: string
		type: string
	}
	sources: Record<string, string>
}

export default function ({ img, sources }: Picture) {
	const imageSet = [
		img.src && `'${img.src}' 1x`,
		...Object.entries(sources).flatMap(([key, value]) => {
			const [url] = (value as string).split(',').pop()?.trim().split(' ') ?? []
			return `'${url}' type('image/${key}')`
		}),
	]
		.filter(Boolean)
		.join(', ')

	return `image-set(${imageSet})`
}
