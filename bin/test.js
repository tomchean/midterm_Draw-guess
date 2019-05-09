const express = require('express');
const app = express();

//const mongoose = require('mongoose');

// 加入這兩行
const server1 = require('http').Server(app);
const io = require('socket.io')(server1);
//app.use(express.static(path.join(__dirname, 'public')));

var ans ='tom';
var names =[]
var painter = {
    index : -1,
    id : -1
}
var message = [];
var player_num =0;
var correct_num =0;
var status = 0;
// 當發生連線事件
io.on('connection', (socket) => {
    console.log('new')
    socket.on('new_people',name=>{
        names.push({
            id:socket.id,
            name:name,
            score:0
        });
        player_num +=1;
        socket.broadcast.emit('update_people',{
            names:names.map(x=>x['name']),
            scores:names.map(x=>x['score'])
        });
        if( player_num === 1){
            
            socket.emit('goto','painter');
            painter.index = 0;
            painter.id = socket.id;
        }
        else{
            socket.emit('goto','viewer');
        }
    })
    socket.on('update_people',()=>{
        socket.emit('update_people',{
            names:names.map(x=>x['name']),
            scores:names.map(x=>x['score'])
        });
    })
    socket.on('update_message',()=>{
        socket.emit('update_message',message);
    })

    // 當發生離線事件
    socket.on('disconnect', () => {
        if(socket.id === painter.id){
            socket.broadcast.emit('reset_timer');
            painter.index+=1;
            if(painter.index === names.length){
                painter.index =0;
            }
            if(player_num >0){
                painter.id = names[painter.index].id;
                io.to(names[painter.index].id).emit('goto','painter')
            }            
        }
        let pos = names.findIndex(x=>x.id===socket.id)
        if(pos !== -1){
            names.splice(pos,1);
            player_num-=1;
            if(pos < painter.index){
                painter.index-=1;
            }
            socket.broadcast.emit('update_people',{
                names:names.map(x=>x['name']),
                scores:names.map(x=>x['score'])
            })     
        }   
    });
    
    socket.on('click',(data=>{
        socket.broadcast.emit('update_cor',{
            x: data.x,
            y: data.y,
            drag:data.drag
          });
    }));
    socket.on('clear',()=>{
        socket.broadcast.emit('clear');
    });
    socket.on('change_brush',value=>{
        socket.broadcast.emit('change_brush',value);
    });
    socket.on('change_color',value=>{
        socket.broadcast.emit('change_color',value);
    });
    socket.on('answer',answer=>{
        console.log(answer,ans);
        if(answer.ans!==ans){
            socket.emit('wrong')
            message.push(answer.ans);
            socket.emit('update_message',message);
            socket.broadcast.emit('update_message',message);
        }
        else {
            if(status ===0) return;
            correct_num +=1 
            socket.emit('right');
            let pos = names.findIndex(x=>x.id===socket.id)
            names[pos].score+=1;
            socket.broadcast.emit('update_people',{
                names:names.map(x=>x['name']),
                scores:names.map(x=>x['score'])
            });
            if(correct_num === player_num-1){
                console.log('change_view')
                status = 0;
                io.to(names[painter.index].id).emit('goto','viewer');
                painter.index+=1;
                if(painter.index === names.length){
                    painter.index =0;
                }
                painter.id = names[painter.index].id;
                io.to(names[painter.index].id).emit('goto','painter')
            }
        }
    })
    socket.on('update_ans',(answer)=>{
        status =1;
        ans = answer;
        socket.broadcast.emit('timer_start');
        correct_num =0;
        message = [];
        socket.emit('update_message',message);
        socket.broadcast.emit('update_message',message);
    });
    socket.on('change_view',() =>{
        console.log('change')
        status =0;
        if(player_num !== 0){
            io.to(names[painter.index].id).emit('goto','viewer');
            painter.index+=1;
            if(painter.index === names.length){
                painter.index =0;
            }
            painter.id = names[painter.index].id;
            io.to(names[painter.index].id).emit('goto','painter')
        }  
    })
});
 




// 注意，這邊的 server 原本是 app
server1.listen(4000, () => {
    console.log("Server Started. http://localhost:4000");
});
