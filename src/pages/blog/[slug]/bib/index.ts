import { getCollection } from "astro:content";
import { bibtexEntry, postCanonicalPath, postTitle } from "@/lib/citation";

export async function getStaticPaths(): Promise<Array<{ params: { slug: string }, props: { post: any } }>> {
    const blogEntries = await getCollection("blog");
    return blogEntries.map((post) => ({
        params: { slug: post.id },
        props: { post },
    }));
}

export async function GET({ props, site }: { props: { post: any }; site: URL }) {
    const { post } = props;
    const postUrl = new URL(postCanonicalPath(post.id), site).href;
    const body = bibtexEntry(post.data, postUrl);
    const filename = `${post.id}.bib`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/x-bibtex; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "X-Content-Type-Options": "nosniff",
        },
    });
}
