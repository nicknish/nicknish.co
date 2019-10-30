export const HOME_URL = '/';
export const BLOG_URL = '/blog';
export const SERIES_URL = '/series';
export const WORK_URL = '/work';
export const PROJECT_URL = '/projects';
export const NEWSLETTER_URL = '/newsletter';

export const createPath = (type: string, slug: string) => `${type}/${slug}`;
