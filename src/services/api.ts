import { API_CONFIG } from "../config/api";

export const startDebug = async (url1: string, url2: string, userId: string) => {
  const response = await fetch(API_CONFIG.url, {
    method: "POST",
    body: JSON.stringify({
      url1: url1,
      url2: url2,
      userId: userId
    }),
  });

  if (!response || !response.ok) {
    throw new Error("invalid data fetch");
  }
  /*const result = await response.json();*/
};
