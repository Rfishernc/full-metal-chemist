class molecule {
    constructor(name) {
        this.name = name;
        this.branch = [];
        this.counter = 0;
        this.formula = '';
        this.molecularWeight = '';
        this.atoms = '';
    }

    propertySetter() {
        function weightSummation() {
            let molecularWeight = 0;
            for(let i = 0; i < this.branch.length; i++) {
                for(let j = 0; j < this.branch[i].atomicStructure.length; j++) {
                    molecularWeight += this.branch[i].atomicStructure[j].weight;
                }
            }
            return molecularWeight;
        }
        let boundWeight = weightSummation.bind(this);
        this.molecularWeight = boundWeight();
    
        function formulaSummation() {
            let formula = 0;
            for(let i = 0; i < this.branch.length; i++) {
                for(let j = 0; j < this.branch[i].atomicStructure.length; j++) {
                    formula += this.branch[i].atomicStructure[j].element;
                }
            }
            return formula;
        }
        let boundFormula = formulaSummation.bind(this);
        this.formula = boundFormula();
   
        let Ccount = (this.formula.match(/C/g) || []).length; 
        let Hcount = (this.formula.match(/H/g) || []).length;
        let Ocount = (this.formula.match(/O/g) || []).length;
        let Bcount = (this.formula.match(/B/g) || []).length;
        let Brcount = (this.formula.match(/Br/g) || []).length;
        let Clcount = (this.formula.match(/Cl/g) || []).length;
        let Fcount = (this.formula.match(/F/g) || []).length;
        let Mgcount = (this.formula.match(/Mg/g) || []).length;
        let Ncount = (this.formula.match(/N/g) || []).length;
        let Pcount = (this.formula.match(/P/g) || []).length;
        let Scount = (this.formula.match(/S/g) || []).length;
        Bcount = Bcount - Brcount;
        
        let Cformula = 'C' + Ccount;
        let Hformula = 'H' + Hcount;
        let Oformula = 'O' + Ocount;
        let Bformula = 'B' + Bcount;
        let Brformula = 'Br' + Brcount; 
        let Clformula = 'Cl' + Clcount;
        let Fformula = 'F' + Fcount;
        let Mgformula = 'Mg' + Mgcount;
        let Nformula = 'N' + Ncount;
        let Pformula = 'P' + Pcount;
        let Sformula = 'S' + Scount;

        let formulaArray = [Cformula, Hformula, Oformula, Bformula, Brformula, Clformula, Fformula, Mgformula, Nformula, Pformula, Sformula];
        let countArray = [Ccount, Hcount, Ocount, Bcount, Brcount, Clcount, Fcount, Mgcount, Ncount, Pcount, Scount];
        let formula = '';

        for(let i = 0; i < formulaArray.length; i++) {
            if(countArray[i] > 0) {
                formula += formulaArray[i];
            }
        }
        this.formula = formula;
    
        function valenceSummation() {
            let availableValence = 0;
            for(let i = 0; i < this.branch.length; i++) {
                for(let j = 0; j < this.branch[i].atomicStructure.length; j++) {
                    availableValence += this.branch[i].atomicStructure[j].valence;
                }
            }
            return availableValence;
        }
        let boundValence = valenceSummation.bind(this);
        this.availableValence = boundValence();
    }

    brancher() {
        for(let i = 0; i < arguments.length; i++) {
            let carbonQty = arguments[i];
            this.branch.push({branchId: i+1});
            this.branch[i]['atomicStructure'] = [];
            for(let j = 0; j < carbonQty; j++) {
                let counter = this.counter;
                window['C'+counter]= new atom('C', this.counter);
                this.branch[i]['atomicStructure'].push(window['C'+counter]);
                this.counter++;
            }
        }
        this.propertySetter();
    }

    bounder() {
        for(let i = 0; i <arguments.length; i++) {
            let bonder = arguments[i];
            this.branch[bonder[1]-1].atomicStructure[bonder[0]-1].carbonBonds = (('Branch'+bonder[3]) + ' ' + ('C' + bonder[2]));
            this.branch[bonder[3]-1].atomicStructure[bonder[2]-1].carbonBonds = (('Branch'+bonder[1]) + ' ' + ('C' + bonder[0]));
        }
        this.propertySetter();
    }    

    mutate() {
        for(let i = 0; i <arguments.length; i++) {
            let mutator = arguments[i];
            let mutatorId = this.branch[mutator[1]-1].atomicStructure[mutator[0]].id;
            window[mutator[2]+mutatorId] = new atom(mutator[2], mutatorId);
            this.branch[mutator[1]-1].atomicStructure.splice(mutator[0], 1,  window[mutator[2]+mutatorId]); 
        }
        this.propertySetter();
    }
    
    add() {
        for(let i = 0; i <arguments.length; i++) {
            let adder = arguments[i];
            let counter = this.counter;
            window[adder[2]+counter]= new atom(adder[2], this.counter);
            this.branch[adder[1]-1].atomicStructure.splice(adder[0],0, window[adder[2]+counter]);
            this.counter++;
        }
        this.propertySetter();
    }

    add_chaining() {
        for(let i = 2; i <arguments.length; i++) {
            let chainer = arguments[i];
            let counter = this.counter;
            window[chainer+counter]= new atom(chainer, this.counter);
            this.branch[arguments[1]-1].atomicStructure.splice((arguments[0]+i-2),0, window[chainer+counter]);
            this.counter++;
        }
        this.propertySetter();
    }

    

    closer() {
        this.propertySetter();
    }

    unlock() {

    }

}

class atom {
    constructor(element, id) {
        this.element = element;
        this.id = id;
        switch(element) {
            case 'H': this.valence =1; this.weight =1; break;
            case 'B': this.valence =3; this.weight =10.8; break;
            case 'C': this.valence =4; this.weight =12; this.carbonBonds = 'unbonded'; break;
            case 'N': this.valence =3; this.weight =14; break;
            case 'O': this.valence =2; this.weight =16; break;
            case 'F': this.valence =1; this.weight =19; break;
            case 'Mg': this.valence =2; this.weight =24.3; break;
            case 'P': this.valence =3; this.weight =31; break;
            case 'S': this.valence =2; this.weight =32.1; break;
            case 'Cl': this.valence =1; this.weight =35.5; break;
            case 'Br': this.valence =1; this.weight =80; break;
            default: break;
        }
    }
}

// Symbol:           H     B     C     N     O     F    Mg     P     S    Cl    Br
// Valence number:   1     3     4     3     2     1     2     3     2     1     1
// Atomic weight:  1.0  10.8  12.0  14.0  16.0  19.0  24.3  31.0  32.1  35.5  80.0  (in g/mol)

let m = new molecule('steve');
m.brancher(3, 4, 11);
m.bounder([7,3,2,1]);
m.mutate([7,3,'H']);
m.add([2,1,'H']);
m.add_chaining(2,2,'H','S','F');
console.log(m.branch);
m.closer();
console.log(m);

// propertySetter() {
//     function weightSummation() {
//     let molecularWeight = 0;
//     for(let i = 0; i < this.branch.length; i++) {
//         for(let j = 0; j < this.branch[i].atomicStructure.length; j++) {
//             molecularWeight += this.branch[i].atomicStructure[j].weight;
//         }
//     }
//     return molecularWeight;
// }
// let boundWeight = weightSummation.bind(this);
//         this.molecularWeight = boundWeight();

// function formulaSummation() {
//     let formula = 0;
//     for(let i = 0; i < this.branch.length; i++) {
//         for(let j = 0; j < this.branch[i].atomicStructure.length; j++) {
//             formula += this.branch[i].atomicStructure[j].element;
//         }
//     }
//     return formula;
// }
// let boundFormula = formulaSummation.bind(this);
//         this.formula = boundFormula();
// }