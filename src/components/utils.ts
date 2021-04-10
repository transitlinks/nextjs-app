export const getImageUrl = (src: string | null | undefined, mediaUrl: string): string | null => {

  if (src) {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    } else {
      return `${mediaUrl}${src}`;
    }
  }

  return null;

};
