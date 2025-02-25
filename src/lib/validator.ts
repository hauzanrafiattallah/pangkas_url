export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isValidSlug = (slug: string | undefined) => {
  if (!slug) return true;
  const regex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
  return regex.test(slug);
};
