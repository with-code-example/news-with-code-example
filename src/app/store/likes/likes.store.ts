import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Models } from 'appwrite';
import { ApiService } from "../../services/api.service"; 
import { environment } from "src/environments/environment";

export namespace Likes {
    /** Actions */
    export class Fetch {
      static readonly type = '[Like] FetchLikes';
      constructor(
        public payload: { queries: any; }
      ) {}
    }
}

/** State Model */
export class LikesStateModel {
    likes: Array<Models.Document>;
}
@State<LikesStateModel>({
    name: 'likesState',
    defaults: {
        likes: [],
    },
})

@Injectable()
export class LikesState {
    constructor(private api: ApiService) {}

    @Selector()
    static getLikes(state: LikesStateModel) {
      return state.likes;
    }

    @Action(Likes.Fetch)
    async fetchLikes(
        { setState }: StateContext<LikesStateModel>,
        action: Likes.Fetch
    ) {
        let { queries } = action.payload;
        try {
            let likes = await this.api.db().listDocuments(
                environment.database.tech_news,
                environment.database.collection.likes,
                queries
            )
            
            setState({
                likes: likes.documents,
            });
        } catch (e: any) {
            console.log('Failed to fetch likes')
        }
    }
}