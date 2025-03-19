export const profile = {
	fullName: 'Aïda Elamrani',
	blogName: 'ConsciencAI',
	title: '',
	institute: '',
	author_name: 'Elamrani', // Author name to be highlighted in the papers section
	research_areas: [
		{ title: 'Artificial Consciousness', description: 'Brief description of the research interest', field: 'physics' },
		{ title: 'AI Ethics', description: 'Brief description of the research interest', field: 'physics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'aidaelamrani [at] outlook [dot] fr',
	linkedin: 'https://www.linkedin.com/in/a%C3%AFda-elamrani-a0b943237/',
	x: 'https://www.x.com/AidaElam',
	github: '',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
	bluesky: 'https://bsky.app/profile/aidaelamrani.bsky.social',
	mastodon:'https://mastodon.social/@AidaElamrani'
}

export const template = {
	website_url: 'https://conscienc.ai/', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	descriptionLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
	default_title: 'ConsciencAI',
	default_description: 'ConsciencAI is a blog about computers, AI, consciousness, and the infosphere.',
	default_image: 'https://conscienc.ai/unicorn.jpg',
}
