import rss from "@astrojs/rss";
import { seo } from "../settings";
import { getCollection } from "astro:content";

export async function GET(context) {
    const blog = await getCollection("blog");
    const posts = blog
        .filter((post) => !post.data.draft)
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

    return rss({
        
        title: seo.default_title,
        
        description: seo.default_description,
        
        
        site: context.site,
        
        
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.id}`,
        })),
        
        customData: `<language>en-us</language>`,
    });
}
