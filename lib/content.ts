import { BlogPost } from '../types/blog';

// In a real Vite environment, we use import.meta.glob
// For this POC/Refactor, we will simulate the loader which can be easily swapped
// with a proper library like vite-plugin-markdown if needed.

export interface PostMetadata {
    id: string;
    title: string;
    category: string;
    date: string;
    readTime: string;
    featuredImage: string;
    bannerImage: string;
    audioSrc: string;
    tags: string[];
}

/**
 * Normalizes content by converting Markdown-style images and headings to our internal block structure.
 */
export const parseMarkdownContent = (markdown: string) => {
    const lines = markdown.split('\n');
    const blocks: any[] = [];
    let currentTextBlock = "";

    const flushText = () => {
        if (currentTextBlock.trim()) {
            blocks.push({ type: 'text', content: currentTextBlock.trim() });
            currentTextBlock = "";
        }
    };

    lines.forEach(line => {
        if (line.startsWith('![')) {
            flushText();
            const match = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
                blocks.push({ type: 'image', alt: match[1], src: match[2], position: 'full' });
            }
        } else if (line.startsWith('## ')) {
            flushText();
            blocks.push({ type: 'heading', content: line.replace('## ', '') });
        } else if (line.startsWith('- ')) {
            // Simple list handling
            if (blocks.length > 0 && blocks[blocks.length - 1].type === 'list') {
                blocks[blocks.length - 1].content.push(line.replace('- ', ''));
            } else {
                flushText();
                blocks.push({ type: 'list', content: [line.replace('- ', '')] });
            }
        }
        else {
            currentTextBlock += line + "\n";
        }
    });

    flushText();
    return blocks;
};

// This is a placeholder for how you would actually load from the filesystem in Vite
// For now, it stays as a bridge to the migrated data.
export const loadPosts = async (): Promise<BlogPost[]> => {
    // In production, we'd use:
    // const modules = import.meta.glob('/content/blog/*.md', { eager: true });
    // and return parsed objects.

    // For now, we will reference a "clean" data file that mirrors the MD structure
    // so we don't break the build before they can install markdown plugins.
    const { blogPosts } = await import('../data/blogData');
    return blogPosts;
};
