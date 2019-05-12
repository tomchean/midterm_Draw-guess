
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    console.log('send');
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });


// 加入這兩行
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
            scores:names.map(x=>x['score']),
            index:painter.index,
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
            scores:names.map(x=>x['score']),
            index:painter.index,
        });
    })
    socket.on('update_message',()=>{
        socket.emit('update_message',message);
    })

    // 當發生離線事件
    socket.on('disconnect', () => {
        console.log('leave')
        let pos = names.findIndex(x=>x.id===socket.id)
        if(pos !== -1){
            player_num-=1;
            names.splice(pos,1);
            if(socket.id === painter.id){
                if(pos ===names.length) painter.index = 0;
                for (let x = 0; x < names.length; x++) {
                    if(x===painter.index){
                        io.to(names[x].id).emit('goto','painter');
                        painter.id = names[x].id;
                    }
                    else{
                        io.to(names[x].id).emit('reset');
                        io.to(names[x].id).emit('update_people',{
                            names:names.map(x=>x['name']), 
                            scores:names.map(x=>x['score']),
                            index:painter.index,
                        });
                        io.to(names[x].id).emit('update_message',message);
                    }
                }
            }
            else{
                if(pos < painter.index){
                    painter.index-=1;
                }
                socket.broadcast.emit('update_people',{
                    names:names.map(x=>x['name']),
                    scores:names.map(x=>x['score']),
                    index:painter.index,
                })     
            }
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
            let pos = names.findIndex(x=>x.id===socket.id);
            socket.emit('wrong');
            message.push({
                name: names[pos].name,
                ans: answer.ans,
            });
            socket.emit('update_message',message);
            socket.broadcast.emit('update_message',message);
        }
        else {
            if(status ===0) return;
            let pos = names.findIndex(x=>x.id===socket.id)
            if(pos!=-1){
                correct_num +=1 
                socket.emit('right');
                names[pos].score+=1;
                socket.broadcast.emit('update_people',{
                    names:names.map(x=>x['name']), 
                    scores:names.map(x=>x['score']),
                    index:painter.index,
                });
                if(correct_num === player_num-1){
                    update_view();
                }
            }
        }
    })

    update_view = ()=>{
        correct_num =0;
        message = [];
        status = 0;
        var prev_index = painter.index;
        painter.index+=1;
        if(painter.index === names.length){
            painter.index =0;
        }
        painter.id = names[painter.index].id;
        for (let x = 0; x < names.length; x++) {
            if(x===painter.index){
                io.to(names[x].id).emit('goto','painter');
            }
            else if(x===prev_index) {
                io.to(names[x].id).emit('goto','viewer');
            }
            else{
                io.to(names[x].id).emit('reset');
                io.to(names[x].id).emit('update_people',{
                    names:names.map(x=>x['name']), 
                    scores:names.map(x=>x['score']),
                    index:painter.index,
                });
                io.to(names[x].id).emit('update_message',message);
            }
        }
    }


    socket.on('update_ans',(answer)=>{
        status =1;
        ans = answer;
        socket.broadcast.emit('timer_start');
    });
    socket.on('change_view',() =>{
        update_view();
    })
});
 
// 注意，這邊的 server 原本是 app
server.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
});


