/**
 * URL of a photo in `public/photos/`, correct for any deploy path.
 * Pages one folder deeper (the showcase) pass `root = '../'`.
 */
export const photoUrl = (image: string, root = import.meta.env.BASE_URL) => `${root}photos/${image}`;
