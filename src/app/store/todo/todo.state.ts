import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { Models } from 'appwrite';
import { ApiService } from "../../services/api.service"; 
import { environment } from "src/environments/environment";
import { Todo } from "./todo.model";

export namespace Todos {
    /** Actions */
    export class Fetch {
      static readonly type = '[Todo] FetchTodos';
    }
  
    export class Add {
      static readonly type = '[Todo] AddTodo';
      constructor(
        public payload: { data: Todo; read: string[]; write: string[] }
      ) {}
    }
  
    export class Update {
      static readonly type = '[Todo] UpdateTodo';
      constructor(
        public payload: {
          documentId: string;
          data: Todo;
          read: string[];
          write: string[];
        }
      ) {}
    }
  
    export class Delete {
      static readonly type = '[Todo] DeleteTodo';
      constructor(public payload: { documentId: string }) {}
    }
}

/** State Model */
export class TodoStateModel {
    todos: Array<Models.Document>;
}
@State<TodoStateModel>({
    name: 'todo',
    defaults: {
      todos: [],
    },
})

@Injectable()
export class TodoState {
    constructor(private api: ApiService) {}

    @Selector()
    static getTodos(state: TodoStateModel) {
      return state.todos;
    }

    @Action(Todos.Fetch)
    async fetchTodos(
        { setState, dispatch }: StateContext<TodoStateModel>,
        action: Todos.Fetch
    ) {
        console.log("HELLO")
        try {
            let todos = await this.api.db().listDocuments(
                environment.database.tech_news,
                environment.database.collection.posts
            )
            setState({
                todos: todos.documents,
            });
        } catch (e: any) {
            console.log('Failed to fetch todos');
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