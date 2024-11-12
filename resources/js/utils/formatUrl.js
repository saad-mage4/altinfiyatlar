export const formatUrl = (url) => {
   if (!url) return "#"; // Return a placeholder URL if none is provided

   if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `http://${url}`; // Prepend 'http://' if missing
   }
   return url;
};


const baseUrl = import.meta.env.VITE_APP_URL;
export const getFullUrl = (url) => {
   if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
   }
   return `${baseUrl}${url}`;
};