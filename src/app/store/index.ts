import { FeedsState } from './feeds/feeds';
import { TagFeedsState } from './feeds/tagFeed';
export * from './feeds/feeds';
export * from './feeds/tagFeed';


export const AppState = [FeedsState, TagFeedsState];