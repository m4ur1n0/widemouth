

// Base Sanity Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}

// Song Object Type (embedded in Album)
export interface Song {
  title: string;
  coverOverride?: SanityImage;
  lyrics?: string;
  credits?: string;
}

// Song with projected URL (from queries)
export interface SongWithUrl extends Song {
  coverOverrideUrl?: string;
}

// Featured Project Object Type (embedded in SiteSettings)
export interface FeaturedProject {
  title?: string;
  spotifyLink?: string;
  image?: SanityImage;
}

// Featured Project with projected URL (from queries)
export interface FeaturedProjectWithUrl extends FeaturedProject {
  imageUrl?: string;
}

// Album Document Type
export interface Album extends SanityDocument {
  _type: 'album';
  title: string;
  orderIndex: number;
  month: string;
  year: number;
  spotifyLink?: string;
  bandcampLink?: string;
  coverFront: SanityImage;
  coverBack?: SanityImage;
  songs?: Song[];
}

// Album with projected URLs (from queries)
export interface AlbumWithUrls extends Omit<Album, 'songs'> {
  coverFrontUrl?: string;
  coverBackUrl?: string;
  songs?: SongWithUrl[];
}

// Show Document Type
export interface Show extends SanityDocument {
  _type: 'show';
  location: string;
  datetime: string;
  ticketLink?: string;
  headliner?: string;
  opener?: string;
  poster?: SanityImage;
  posterUrl?: string;
}

// Merch Item Document Type
export interface MerchItem extends SanityDocument {
  _type: 'merchItem';
  picture: SanityImage;
  price: number;
  bandcampLink?: string;
  description?: string;
}

// Merch Item with projected URL (from queries)
export interface MerchItemWithUrl extends MerchItem {
  pictureUrl?: string;
}

// Band Member Document Type
export interface BandMember extends SanityDocument {
  _type: 'bandMember';
  name: string;
  bio: string;
  order: number;
  instrument: string;
  modelPath: string;
  websites: string[];
  

}

// Press Item Document Type
export interface PressItem extends SanityDocument {
  _type: 'pressItem';
  link: string;
  title: string;
  description: string;
  pageOrder: number;
}

// Site Settings Document Type
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  featuredProject?: FeaturedProject;
  bandBio?: string;
  bandPhoto?: SanityImage;
  featuredVideos?: string[];
  email?: string;
  substackLink?: string;
  instagramLink?: string;
  spotifyLink?: string;
  contactEmail?: string;
  linktreeLink?: string;
}

// Site Settings with projected URLs (from queries)
export interface SiteSettingsWithUrls extends Omit<SiteSettings, 'featuredProject'> {
  bandPhotoUrl?: string;
  featuredProject?: FeaturedProjectWithUrl;
}

// Union type of all document types
export type SanityDocumentType =
  | Album
  | Show
  | MerchItem
  | BandMember
  | PressItem
  | SiteSettings;

// Helper type for query results
export type QueryResult<T> = T | null;
export type QueryResults<T> = T[];
