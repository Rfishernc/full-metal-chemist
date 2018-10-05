Object.prototype.renameProperty = function (oldName, newName) {
   if (this.hasOwnProperty(oldName)) {
       this[newName] = this[oldName];
       delete this[oldName];
   }
   return this;
};

class molecule {
    constructor(name) {
        this.name = name;
        this.branch = [];
    }

    brancher() {
        for(let i = 0; i < arguments.length; i++) {
            let carbonQty = arguments[i];
            this.branch.push({branchId: i+1});
            for(let j = 0; j < carbonQty; j++) {
                this.branch[i]['C'+(j+1)] = {carbonBonds: 'unbonded'};
            }
        }
    }

    bounder() {
        for(let i = 0; i <arguments.length; i++) {
            let bonder = arguments[i];
            this.branch[bonder[1]-1]['C'+bonder[0]].carbonBonds = (('Branch'+bonder[3]) + ' ' + ('C' + bonder[2]));
            this.branch[bonder[3]-1]['C'+bonder[2]].carbonBonds = (('Branch'+bonder[1]) + ' ' + ('C' + bonder[0]));
        }
    }    

    mutate() {
        for(let i = 0; i <arguments.length; i++) {
            let mutator = arguments[i];
            this.branch[mutator[1]-1].renameProperty(['C'+mutator[0]], mutator[2]);
        }
    }
    
    add() {
        for(let i = 0; i <arguments.length; i++) {
            let adder = arguments[i];
            if(this.branch[adder[1]-1]['C'+adder[0]]['nonCarbonBonds'] === undefined) {
                this.branch[adder[1]-1]['C'+adder[0]]['nonCarbonBonds'] = adder[2];
            }
            else {
                this.branch[adder[1]-1]['C'+adder[0]]['nonCarbonBonds'] += adder[2];
            }
        }
    }

    add_chaining() {
        for(let i = 2; i <arguments.length; i++) {
            let chainer = arguments[i];
            if(this.branch[arguments[1]-1]['C'+arguments[0]]['nonCarbonBonds'] === undefined) {
                this.branch[arguments[1]-1]['C'+arguments[0]]['nonCarbonBonds'] = ('-'+chainer);
            }
            else {
                this.branch[arguments[1]-1]['C'+arguments[0]]['nonCarbonBonds'] += ('-'+chainer);
            }
        }
    }

    closer() {

    }

    unlock() {

    }
}

// Symbol:           H     B     C     N     O     F    Mg     P     S    Cl    Br
// Valence number:   1     3     4     3     2     1     2     3     2     1     1
// Atomic weight:  1.0  10.8  12.0  14.0  16.0  19.0  24.3  31.0  32.1  35.5  80.0  (in g/mol)

let m = new molecule('steve');
m.brancher(3, 4, 11);
m.bounder([7,3,2,1]);
console.log(m.branch);
m.mutate([7,3,'H']);
console.log(m.branch);
m.add([2,1,'H']);
console.log(m.branch);
m.add_chaining(2,2,'H','S','F');
console.log(m.branch);

