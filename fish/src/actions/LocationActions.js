import dispatcher from "../dispatchers/Dispatcher";

class LocationActions{
    getLocations(){
        dispatcher.handleViewAction({
            commandType: 'GET_LOC_LIST'
        });
    }
}

export default new LocationActions()