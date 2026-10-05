/** URL of a photo in `public/photos/`, correct for any deploy path. */
export const photoUrl = (image: string) => `${import.meta.env.BASE_URL}photos/${image}`;
