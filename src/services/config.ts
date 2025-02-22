"use server";

export const getBaseURL = async (): Promise<string> => {
  const pangkasUrl = process.env.PANGKAS_URL;
  if (pangkasUrl) {
    return pangkasUrl;
  }
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }
  return "http://localhost:3000";
};
