import { profile } from '../settings'
import { template } from '../settings'

export function highlightAuthor(authors: string): string{
	const author = authors.split(', ')
	if (author.includes(profile.author_name)){
		return authors.replace(profile.author_name, `<span class='font-medium underline'>${profile.author_name}</span>`)
	}
	return authors
}

export function trimDescription(description: string): string {
	const descriptionLength = template.descriptionLength
	return description.length > descriptionLength ? `${description.substring(0, descriptionLength)}...` : description
}
