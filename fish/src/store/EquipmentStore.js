import EventEmitter from 'events';


class EquipmentStore extends EventEmitter{
    _equipment_items = [];

    emitChange(){
        this.emit('change')
    }

    addChangeListener(callback){
        this.addListener('change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('change', callback);
    }


}

const equipmentStore = new EquipmentStore();
export default equipmentStore;