import dispatcher from "../dispatchers/Dispatcher";
import fishermanStore from "../store/FishermanStore";
const axios = require('axios');

class FishermanActions {
    getAllFisherman(){
        dispatcher.handleViewAction({
            commandType: "GET_ALL_FISHER"
        })
    }
}

export default new FishermanActions();

dispatcher.register((action) => {
    if(action.command.commandType === 'GET_ALL_FISHER'){
        axios.get('http://localhost:3001/fishermen')
            .then((res) => {
                fishermanStore._fishermen = res.data;
                console.log("Fishermen loaded");
                fishermanStore.emitChange();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

