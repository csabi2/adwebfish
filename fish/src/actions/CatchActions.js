import dispatcher from "../dispatchers/Dispatcher";

class CatchActions {
    postCatch(item){
        dispatcher.handleViewAction({
            commandType: "POST_CATCH",
            item: item
        })
    }

    getCatch(params){
        dispatcher.handleViewAction({
            commandType: "GET_CATCH",
            params: params
        })
    }
}

export default new CatchActions()