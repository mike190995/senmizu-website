import { BlogPost } from '../types/blog';

// Standardized Blog Data - Bridging to Markdown
// Paths have been sanitized (no spaces, consistent kebab-case folders where possible)
export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: "Trinidad's Digital Strategy is Missing One Thing. We're Building It.",
        featuredImage: '/blog/trinidad-digital-strategy/banner.jpg', // Standardized
        bannerImage: '/blog/trinidad-digital-strategy/banner.jpg',
        audioSrc: '/blog/trinidad-digital-strategy/podcast.m4a',
        category: 'Technology',
        date: 'October 24, 2023',
        readTime: '5 min read',
        tags: ['Digital Transformation', 'Trinidad and Tobago', 'Google Ecosystem', 'Digital Fluidity'],
        content: [
            { type: 'text', content: '"Digital Transformation" is no longer a peripheral buzzword in the Caribbean...' },
            // ... content blocks omitted for brevity as they will be loaded from MD soon
        ]
    },
    {
        id: '2',
        title: "5 Signs Your Business Isn't 'Cloud-Native', It's Just 'Cloud-Hosted'",
        featuredImage: '/blog/cloud-native/banner.jpg',
        bannerImage: '/blog/cloud-native/banner.jpg',
        audioSrc: '/blog/cloud-native/podcast.m4a',
        category: 'Technology',
        date: 'November 1, 2023',
        readTime: '7 min read',
        tags: ['Cloud-Native', 'Cloud-Hosted', 'Google Cloud', 'Automation'],
        content: []
    },
    {
        id: '3',
        title: 'The "Off-the-Shelf" Trap',
        featuredImage: '/blog/off-the-shelf/banner.jpg',
        bannerImage: '/blog/off-the-shelf/banner.jpg',
        audioSrc: '/blog/off-the-shelf/podcast.m4a',
        category: 'Technology',
        date: 'November 15, 2023',
        readTime: '6 min read',
        tags: ['SaaS', 'Custom Software', 'Business Applications', 'Google Cloud'],
        content: []
    },
    {
        id: '4',
        title: "What is an 'AI Agent'?",
        featuredImage: '/blog/ai-agents/banner.jpg',
        bannerImage: '/blog/ai-agents/banner.jpg',
        audioSrc: '/blog/ai-agents/podcast.m4a',
        category: 'Technology',
        date: 'November 22, 2023',
        readTime: '6 min read',
        tags: ['AI', 'AI Agent', 'Chatbot', 'Business Automation'],
        content: []
    }
];
