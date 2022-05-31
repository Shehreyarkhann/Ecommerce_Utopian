import sanityClinet from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClinet({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "sanitopia",
    apiVersion: "2022-05-31",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);