export class Player {

    num;
    mapsize=25;
    shipAmount = 4;

    battelgroundEnemy: string[][] = [["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"]];
    ships = Array<Ship>();

    constructor(num:number) {
        this.num = num;
        this.generateShips();
    }

    generateShips(): void {

        while (this.ships.length < this.shipAmount) {
            var x = Math.floor(Math.random() * (Math.sqrt(this.mapsize) + 1));
            var y = Math.floor(Math.random() * (Math.sqrt(this.mapsize) + 1));

            var shipAlreadyThere:boolean = false;
            this.ships.forEach(ship => {if(ship.isThere(x,y)) {
                shipAlreadyThere = true;
            }})

            if(shipAlreadyThere) {
                continue;
            }
            var ship: Ship = new Ship(x,y);
            this.ships.push(ship);
        }
    }

    print(): void {
        console.log('Player'+this.num+':')
        console.log('our remaining ships:')
        this.ships.forEach(it => console.log(it));
        console.log('enemy field:');
        this.battelgroundEnemy.forEach(it => console.log(it));
    }

    fire(x:number, y:number, enemyPlayer: Player):boolean {
        console.log("Method fire has been called with the cords: "+ x + " " + y);
        if(this.battelgroundEnemy[x][y] != "?") {
            console.log("You already shot there");
            return false;
        }
        if(enemyPlayer.gotHit(x,y)) {
            this.battelgroundEnemy[x][y]= "X";
            console.log("HIT");
            return true;
        }
        this.battelgroundEnemy[x][y] = "O";
        console.log("MISSED");
        return true;
    }

    gotHit(x:number, y:number):boolean {
        var shipHit:boolean = false;

        this.ships.forEach( currentShip => {
            if(currentShip.isThere(x,y) && currentShip.isAlive()) {
                this.shipAmount -= 1;
                currentShip.sink();
                shipHit = true;
            }
         });

        return shipHit;
    }

    isDeafeated():boolean {
        return this.shipAmount == 0;
    }
}

export class Ship {
    x:number;
    y:number; 

    alive:boolean = true;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    
    isThere(x:number, y:number): boolean {
        return(x == this.x && y == this.y);
    }
    isAlive():boolean {
        return this.alive;
    }
    sink():void {
        this.alive = false;
    }

}