import { AssetTargeting } from './targeting-option.model';

interface Campaign {
  id?: number;
  basicInformation: CampaignBasicInformation;
  targeting: {
    requires: object;
    excludes: object;
  };
  ads: Ad[];

  targetingArray?: AssetTargeting;
  clicks?: number;
  impressions?: number;
  CTR?: number;
  averageCPC?: number;
  cost?: number;
  conversions?: number;
  classificationStatus: number;
  classificationTags?: string;
}

interface CampaignsTotals {
  totalBudget: number;
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averageCPC: number;
  totalCost: number;
}

interface CampaignBasicInformation {
  status: number;
  name: string;
  targetUrl: string;
  maxCpc: number;
  maxCpm: number;
  budget: number;
  dateStart: string;
  dateEnd?: string;
}

interface Ad {
  id: number;
  status: number;
  name: string;
  type: number;
  size: number;
  clicks: number;
  impressions: number;
  CTR: number;
  averageCPC: number;
  cost: number;
  budget: number;

  imageUrl?: string;
  imageSize?: string;
  html?: string;
}

export { Campaign, CampaignBasicInformation, Ad, CampaignsTotals };
