import EventEmitter from 'events';


class MessageStore extends EventEmitter{
    _message = {
        show: false,
        text: ''
    };

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

const message = new MessageStore();
export default message;