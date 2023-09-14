import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { Models, Query } from 'appwrite';
import { ApiService } from "../../services/api.service"; 
import { environment } from "src/environments/environment";

export namespace Feeds {
    /** Actions */
    export class Fetch {
      static readonly type = '[Feed] FetchFeeds';
      constructor(
        public payload: { queries: any; }
      ) {}
    }
  
    // export class Add {
    //   static readonly type = '[Todo] AddTodo';
    //   constructor(
    //     public payload: { data: Todo; read: string[]; write: string[] }
    //   ) {}
    // }
  
    // export class Update {
    //   static readonly type = '[Todo] UpdateTodo';
    //   constructor(
    //     public payload: {
    //       documentId: string;
    //       data: Todo;
    //       read: string[];
    //       write: string[];
    //     }
    //   ) {}
    // }
  
    // export class Delete {
    //   static readonly type = '[Todo] DeleteTodo';
    //   constructor(public payload: { documentId: string }) {}
    // }
}

/** State Model */
export class FeedsStateModel {
    feeds: Array<Models.Document>;
}
@State<FeedsStateModel>({
    name: 'feedsState',
    defaults: {
        feeds: [],
    },
})

@Injectable()
export class FeedsState {
    constructor(private api: ApiService) {}

    @Selector()
    static getFeeds(state: FeedsStateModel) {
      return state.feeds;
    }

    @Action(Feeds.Fetch)
    async fetchFeeds(
        { getState, patchState }: StateContext<FeedsStateModel>,
        action: Feeds.Fetch
    ) {
        let { queries } = action.payload;
        try {
            let feeds = await this.api.db().listDocuments(
                environment.database.tech_news,
                environment.database.collection.posts,
                queries
            )
            var oldFeeds = getState().feeds
            patchState({
                feeds: [...oldFeeds, ...feeds.documents],
            });
        } catch (e: any) {
            console.log('Failed to fetch feeds');
            // dispatch(
            //     new GlobalActions.setAlert({
            //     message: e.message,
            //     show: true,
            //     color: 'red',
            //     })
            // );
        }
    }

    // @Action(AddUsers)
    // addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
    //     return this._du.addUsers(payload).pipe(tap(returnData => {
    //         const state=ctx.getState();
    //         ctx.patchState({
    //             users:[...state.users,returnData]
    //         })
    //     }))
    // }

    // @Action(UpdateUsers)
    // updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
    //     return this._du.updateUser(payload, i).pipe(tap(returnData => {
    //         const state=ctx.getState();

    //         const userList = [...state.users];
    //         userList[i]=payload;

    //         ctx.setState({
    //             ...state,
    //             users: userList,
    //         });
    //     }))
    // }

    // @Action(DeleteUsers)
    // deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
    //     return this._du.deleteUser(id).pipe(tap(returnData => {
    //         const state=ctx.getState();
    //         console.log("The is is",id)
    //         //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
    //         const filteredArray=state.users.filter(contents=>contents.id!==id);

    //         ctx.setState({
    //             ...state,
    //             users:filteredArray
    //         })
    //     }))
    // }
}