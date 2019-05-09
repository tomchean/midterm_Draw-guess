import io from 'socket.io-client';

export default {
    set_socket(port){
        
        global.socket = io.connect('140.112.249.193:4000');
    },
    get_socket(){
        return global.socket;
    },
    set_name(name){
        global.name = name;
    },
    get_name(){
        return global.name;
    }
}