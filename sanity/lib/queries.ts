import {defineQuery} from 'next-sanity'

// NOTE : returning ...Url fields for images because it’s the easiest “read-only path” to prove data flow works.
//          can swap to @sanity/image-url later if we want transforms (still read-only).

export const SITE_SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings"][0]{
  _id,
  bandBio,
  bandPhoto,
  "bandPhotoUrl": bandPhoto.asset->url,
  featuredProject{
    title,
    spotifyLink,
    image,
    "imageUrl": image.asset->url,
    timerEnd
  },
  featuredVideos,
  substackLink,
  instagramLink,
  spotifyLink,
  contactEmail,
  linktreeLink
}
`)

export const ALBUMS_QUERY = defineQuery(`
*[_type == "album"] | order(orderIndex asc){
  _id,
  title,
  orderIndex,
  month,
  year,
  spotifyLink,
  bandcampLink,
  coverFront,
  "coverFrontUrl": coverFront.asset->url,
  coverBack,
  "coverBackUrl": coverBack.asset->url,
  songs[]{
    title,
    lyrics,
    credits,
    coverOverride,
    "coverOverrideUrl": coverOverride.asset->url
  }
}
`)

export const SHOWS_QUERY = defineQuery(`
*[_type == "show"] | order(datetime asc){
  _id,
  location,
  datetime,
  ticketLink,
  headliner,
  opener,
  poster,
  "posterUrl": poster.asset->url
}
`)

export const MERCH_QUERY = defineQuery(`
*[_type == "merchItem"]{
  _id,
  picture,
  "pictureUrl": picture.asset->url,
  price,
  bandcampLink,
  description
} | order(_createdAt desc)
`)

export const BAND_MEMBERS_QUERY = defineQuery(`
*[_type == "bandMember"] | order(order asc, name asc){
  _id,
  name,
  bio,
  order,
  instrument,
  modelPath,
  websites
}
`)

export const PRESS_QUERY = defineQuery(`
*[_type == "pressItem"] | order(pageOrder asc){
  _id,
  link,
  title,
  description,
  pageOrder
}
`)

export const SITE_SETTINGS_CONTACT_QUERY = defineQuery(`
*[_type == "siteSettings"][0]{
  _id,
  email,
  substackLink
}
`)
