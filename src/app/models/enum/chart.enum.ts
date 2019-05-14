export enum adminChartSeriesEnum {
  SALDO,
  VIEW,
  CLICKS
}

export enum chartSeriesEnum {
  VIEW,
  CLICK,
  CPC,
  CTR,
  CPM,
  SUM
}

export enum pubChartSeriesEnum {
  view = 'Views',
  click = 'Clicks',
  rpc = 'AVG Revenue / Click',
  ctr = 'Click-through Rate',
  rpm = 'AVG Revenue / Mile',
  sum = 'Revenue',
  viewUnique = 'Unique Views',
  viewInvalidRate = 'Invalid Views Rate',
  clickInvalidRate = 'Invalid Clicks Rate',
}

export enum advChartSeriesEnum {
  view = 'Views',
  click = 'Clicks',
  cpc = 'AVG Cost / Click',
  ctr = 'Click-through Rate',
  cpm = 'AVG Cost / Mile',
  sum = 'Cost',
  viewUnique = 'Unique Views',
  viewInvalidRate = 'Invalid Views Rate',
  clickInvalidRate = 'Invalid Clicks Rate',
}

export enum filterPresetsEnum {
  'Today' = 0,
  'Last 7 days' = 6,
  'Last 30 days' = 30
}
