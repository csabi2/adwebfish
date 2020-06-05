import dispatcher from "../dispatchers/Dispatcher";
import profile from "../store/ProfileStore"
import constants from "../Constants";
import equipmentStore from "../store/EquipmentStore";

const axios = require('axios');

class ProfileActions{
    getProfile(item){
        dispatcher.handleViewAction({
            commandType: 'GET_PROFILE',
            item: item
        });
    }

    getPersonal(item){
        dispatcher.handleViewAction({
            commandType: 'GET_PERSONAL',
            item: item
        });
    }
}

export default new ProfileActions()

dispatcher.register((action) => {
    if(action.command.commandType === 'GET_PERSONAL'){
        var id = action.command.item.id;
        getPersonalData(id);
    }
    else if(action.command.commandType === 'GET_PROFILE'){

       var equipmentRaw = [];
       axios.get('http://localhost:3001/fisher_equipment?fisherman=' + getFishermanIdOrDefault(id))
           .then((res) => {
               console.log(res.data);
               equipmentRaw = res.data;
               profile._equipment = [];
               equipmentRaw.forEach(((value, index) => {
                   var equipment_item = equipmentStore._equipment_items.filter((item) => item.id === value.equipment)[0];
                   profile._equipment.push({name: equipment_item.name,
                       general_description: equipment_item.description,
                       personal_description: value.additional_description});
                   console.log(profile._equipment);
               }));
               profile.emitChange();
           })
           .catch((err) => {
               console.log(err);
           });

   }
});

var getPersonalData = (id) => {
    axios.get('http://localhost:3001/fishermen?id=' + getFishermanIdOrDefault(id))
        .then((res) => {
            console.log(res.data[0]);
            profile._profile = res.data[0];
            profile.emitChange();

        })
        .catch((err) => {
            console.log(err);
        });
};

var getFishermanIdOrDefault = (id) => {
    return (id ? id : `${constants.default_demo_profile_id}`);
};