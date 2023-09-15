import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Models } from 'appwrite';
import { ApiService } from "../../services/api.service"; 
import { environment } from "src/environments/environment";

export namespace TagFeeds {
    /** Actions */
    export class Fetch {
      static readonly type = '[Feed] FetchTagFeeds';
      constructor(
        public payload: { queries: any; page: number}
      ) {}
    }

}

/** State Model */
export class TagFeedsStateModel {
    tagFeeds: Array<Models.Document>;
    tagTotal: Number
    tagPage: Number
}
@State<TagFeedsStateModel>({
    name: 'tagFeedsState',
    defaults: {
        tagFeeds: [],
        tagTotal: 0,
        tagPage: 0
    },
})

@Injectable()
export class TagFeedsState {
    constructor(private api: ApiService) {}

    @Selector()
    static getTagFeeds(state: TagFeedsStateModel) {
      return state.tagFeeds;
    }

    @Selector()
    static getTagTotal(state: TagFeedsStateModel) {
      return state.tagTotal;
    }

    @Selector()
    static getTagPage(state: TagFeedsStateModel) {
      return state.tagPage;
    }


    @Action(TagFeeds.Fetch)
    async fetchFeeds(
        { getState, patchState }: StateContext<TagFeedsStateModel>,
        action: TagFeeds.Fetch
    ) {
        let { queries, page } = action.payload;
        try {
            let feeds = await this.api.db().listDocuments(
                environment.database.tech_news,
                environment.database.collection.posts,
                queries
            )
            var oldFeeds = getState().tagFeeds
            patchState({
                tagFeeds: [...oldFeeds, ...feeds.documents],
                tagTotal: feeds.total,
                tagPage: page
            });
        } catch (e: any) {
            console.log('Failed to fetch feeds');
            
        }
    }
}