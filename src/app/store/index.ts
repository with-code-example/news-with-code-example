import { FeedsState } from './feeds';
import { LikesState } from './likes/likes.store';

export * from './feeds';

export * from './likes/likes.store';


export const AppState = [FeedsState, LikesState];