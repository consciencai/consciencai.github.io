import { profile, template } from "@/settings";

type VersionEntry = {
    version: string;
    date: string;
    url?: string;
    pdf?: string;
    doi?: string;
    note?: string;
};

type CitationFrontmatter = {
    authors?: string[];
    title?: string;
    version?: string;
    versionDate?: string;
    originalDate?: string;
    doi?: string;
    zenodoConceptDoi?: string;
    previousVersions?: VersionEntry[];
};

export type BlogCitationData = {
    title: string;
    fulltitle?: string;
    description?: string;
    date: string;
    tags?: string[];
    citation?: CitationFrontmatter;
};

const siteName = "ConsciencAI";

export function withBase(path: string): string {
    const base = template.base || "";
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
}

export function postTitle(data: BlogCitationData): string {
    return data.citation?.title || data.fulltitle || data.title;
}

export function postAuthors(data: BlogCitationData): string[] {
    return data.citation?.authors?.length ? data.citation.authors : [profile.fullName];
}

export function postVersion(data: BlogCitationData): string {
    return data.citation?.version || "1.0";
}

export function postVersionDate(data: BlogCitationData): string {
    return data.citation?.versionDate || data.date;
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function postPdfPath(slug: string): string {
    return withBase(`/blog/${slug}/pdf/`);
}

export function postBibPath(slug: string): string {
    return withBase(`/blog/${slug}/bib`);
}

export function postCanonicalPath(slug: string): string {
    return withBase(`/blog/${slug}`);
}

export function citationTarget(data: BlogCitationData, postUrl: string): string {
    if (data.citation?.doi) {
        return `https://doi.org/${data.citation.doi}`;
    }
    return postUrl;
}

export function citationText(data: BlogCitationData, postUrl: string): string {
    const authors = postAuthors(data).join(", ");
    const year = new Date(postVersionDate(data)).getFullYear();
    const title = postTitle(data);
    const version = postVersion(data);
    const target = citationTarget(data, postUrl);
    return `${authors}. (${year}). "${title}" (${siteName}, version ${version}). ${target}`;
}

function bibtexEscape(value: string): string {
    return value
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/{/g, "\\{")
        .replace(/}/g, "\\}");
}

function citationKey(data: BlogCitationData): string {
    const firstAuthor = postAuthors(data)[0] || profile.fullName;
    const lastName = firstAuthor.split(/\s+/).at(-1) || "author";
    const year = new Date(data.date).getFullYear();
    const titleKey = postTitle(data)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .join("");

    return `${lastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}${year}${titleKey}`;
}

export function bibtexEntry(data: BlogCitationData, postUrl: string): string {
    const fields = [
        ["author", postAuthors(data).join(" and ")],
        ["title", postTitle(data)],
        ["year", String(new Date(data.date).getFullYear())],
        ["date", data.date],
        ...(data.citation?.originalDate ? [["origdate", data.citation.originalDate]] : []),
        ["url", citationTarget(data, postUrl)],
        ["organization", siteName],
    ];

    return [
        `@online{${citationKey(data)},`,
        ...fields.map(([key, value]) => `  ${key} = {${bibtexEscape(value)}},`),
        "}",
        "",
    ].join("\n");
}

export function currentVersionEntry(data: BlogCitationData, postUrl: string, pdfUrl: string): VersionEntry {
    return {
        version: postVersion(data),
        date: postVersionDate(data),
        url: postUrl,
        pdf: pdfUrl,
        doi: data.citation?.doi,
        note: "Current version",
    };
}

export function versionHistory(data: BlogCitationData, postUrl: string, pdfUrl: string): VersionEntry[] {
    return [
        currentVersionEntry(data, postUrl, pdfUrl),
        ...(data.citation?.previousVersions || []),
    ];
}
