import { createClient, PhotosWithTotalResults } from "pexels";
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
const client = createClient(import.meta.env.VITE_PEXELS_KEY as string);

const query = "Nature";

export async function getRandomWallpaper() {
  return client.photos
    .search({
      query,
      per_page: 1,
      page: getRandomInt(4000),
      orientation: "landscape",
    })
    .then((photos) => {
      let total = photos as PhotosWithTotalResults;
      return total.photos[0]?.src.large;
    });
}
