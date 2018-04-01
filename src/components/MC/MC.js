import React, {Component} from 'react';
import Header from "../Header";
import AddSeedMCForm from "../AddSeedMCForm"
import ResultsTable from "../ResultsTable"


class MC extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: []};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
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




    render(){
        const{ results } = this.state;
        return(
            <div>
                <Header/>
                <h1>Metodo Congruencial </h1>
                <AddSeedMCForm addSeed={this.calculateNumbers}/>
                <ResultsTable results={results}/>

            </div>

        );
    }

}


export default MC;