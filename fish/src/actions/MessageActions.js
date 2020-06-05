import dispatcher from "../dispatchers/Dispatcher";
import message from "../store/Message";


class MessageActions {
    toggleMessage(item){
        dispatcher.handleViewAction({
            commandType: 'TOGGLE_MESSAGE',
            item: item
        });
    }
}

export default new MessageActions()

dispatcher.register((action) => {
   if(action.command.commandType === 'TOGGLE_MESSAGE'){
       let item = action.command.item;
       message._message = {
           show: item.show,
           text: item.text
       };
       message.emitChange();
   }
});