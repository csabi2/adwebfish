import EventEmitter from 'events';
import dispatcher from "../dispatchers/Dispatcher";


class FishermanStore extends EventEmitter{
    _fishermen = [];

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

const fishermanStore = new FishermanStore();
export default fishermanStore;
