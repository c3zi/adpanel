interface BannerClassification {
  bannerId: number;
  url: string,
  type: string,
  width: number,
  height: number,
  sourceHost: string;
  landingUrl:string;
  budget?: number;
  cpm?: number;
  cpc?: number;
  classifiedGlobal?: boolean;
  classifiedSite?: boolean;
}

interface BannerClassificationResponse {
  limit: number;
  offset: number;
  itemsCount: number;
  itemsCountAll: number;
  items: BannerClassification[];
}

interface BannerClassificationStatus {
  approved?: number,
  rejected?: number,
  unclassified?: number,
}

interface BannerClassificationFilters {
  status?: BannerClassificationStatus;
  sizes?: Array<string>;
  landingUrl?: string;
}

export {
  BannerClassification,
  BannerClassificationResponse,
  BannerClassificationFilters };
