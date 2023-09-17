import rss from '@astrojs/rss'
import type { AstroConfig } from 'astro'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

export const GET = async (context: AstroConfig) => {
	const blog = await getCollection('blog')

	return rss({
		title: 'The sndwch blog',
		description: 'All sandwich news all the time',
		site: context.site || '',
		items: blog.map((post) => {
			return {
				title: post.data.title,
				pubDate: post.data.date,
				description: post.data.description,
				link: `/blog/${post.slug}`,
				content: sanitizeHtml(parser.render(post.body)),
			}
		}),
	})
}
