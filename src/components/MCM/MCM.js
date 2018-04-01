import React, {Component} from 'react';
import Header from "../Header";
import AddSeedMCForm from "../AddSeedMCForm";
import ResultsTable from "../ResultsTable";

class MCM extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: []};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        this.evaluateValues(seed);
        let results = [];
        let last_seed = seed;
        let generate = true;
        let i = 1;
        do{
            let resOperation = last_seed.a*last_seed.x0 + Number(last_seed.c);
            const generator = "X" + i + "=" + "(" + last_seed.a + "(" + last_seed.x0 +")" + "+" + last_seed.c + ")=" +
                resOperation + "mod" + last_seed.m;
            let operation = this.getOperation(resOperation, last_seed.m);
            const randomNum = operation.res;
            const ri = randomNum / last_seed.m;
            let newResult = {generator:generator, operation: operation.ent + " + " + operation.res + "/" + last_seed.m, randomNumber:randomNum, ri:ri};
            last_seed.x0 = randomNum;
            if(results.filter(result => result.randomNumber === randomNum).length > 0){
                generate = false;
            }else {
                results.push(newResult);
                i++;
            }
            if (i > 100){
                generate = false;
            }
        } while (generate);
        this.setState({results});

    }

    getOperation(number, mod){
        let ent = parseInt(number / mod);
        let res = number % mod;
        const operation = {ent:ent, res: res};
        return operation;
    }

    evaluateValues(seed){

        if(this.mcd(seed.c, seed.m) === 1){
            console.log("Cumple con primera condicion")
        }else {
            console.log("No cumple con primera condicion")
        }

        if(this.mcd(seed.m, seed.a -1) !== 1){
            console.log("Cumple con segunda condicion")
        }else {
            console.log("No cumple con segunda condicion")
        }

        if((seed.m % 4) === 0 && (seed.a - 1) % 4 === 0){
            console.log("Cumple con tercera condicion")
        }else {
            console.log("No cumple con tercera condicion")
        }



    }

    getModule(a,b){
        return (a-Math.floor(a/b)*b);
    }

    mcd(m,n) {
        if(this.getModule(m,n) === 0){
            return n;
        }else{
            return this.mcd(n, this.getModule(m, n));
        }

    }



    render(){
        const{ results } = this.state;
        return(
            <div>
                <Header/>
                <h1>Metodo Congruencial Mixto </h1>
                <AddSeedMCForm addSeed={this.calculateNumbers}/>
                <ResultsTable results={results}/>

            </div>

        );
    }

}


export default MCM;
