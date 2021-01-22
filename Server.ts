import { timeStamp } from 'console';
import * as net from 'net';
import { resolve } from 'path';
import * as readline from 'readline';
import {Player, Ship} from "./Player";


/**var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1'); **/


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function read(question: string) {
      return new Promise<string>( resolve =>  rl.question(question, (it) => {resolve(it)}));
  }

var player1: Player = new Player(1);
var player2: Player = new Player(2);

gameLoop(player1, player2);




async function gameLoop(player:Player, enemy:Player): Promise<void>{
    player.print();

    while(true) {
        var input = await read("where you want to fire?(x,y)");
    
        if(player.fire(+input.charAt(0), +input.charAt(2), enemy)){
            break;
        }
    }
   

    //fire (loop)

    if(enemy.isDeafeated()) {
        console.log("You won!");
        return;
    }

    player.print();
    await timeout();
    gameLoop(enemy, player);
    
}

function timeout() {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.clear();
            resolve();

        } , 3000)
    });
}

function createGameLoop(player1:Player, player2:Player):() => void {


    function gameLoop():void{}
    return gameLoop;
}


