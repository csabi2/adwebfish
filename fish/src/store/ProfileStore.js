import EventEmitter from 'events';


class ProfileStore extends EventEmitter{
    _profile = {};
    _equipment = [];

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

const profile = new ProfileStore();
export default profile;