import dispatcher from "../dispatchers/Dispatcher";
import equipmentStore from "../store/EquipmentStore";
const axios = require('axios');

class EquipmentActions {
    getEquipmentItems(){
        dispatcher.handleViewAction({
            commandType: "GET_ITEMS"
        })
    }
}

export default new EquipmentActions();

dispatcher.register((action) => {
   if(action.command.commandType === 'GET_ITEMS'){
       axios.get('http://localhost:3001/equipment')
           .then((res) => {
               console.log(res.data);
               equipmentStore._equipment_items = res.data;
               equipmentStore.emitChange();

           })
           .catch((err) => {
               console.log(err);
           });
   }
});

