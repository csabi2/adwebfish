import {Dispatcher} from "flux";

class AppDispatcher extends Dispatcher{
    handleViewAction(command){
        this.dispatch({
            actionType: 'VIEW_ACTION',
            command: command
        });
    }
}

const dispatcher = new AppDispatcher();
export default dispatcher;