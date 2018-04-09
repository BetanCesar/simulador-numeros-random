import React, {Component} from 'react';
import Header from "../Header";
import AddSeedMCForm from "../AddSeedMCForm"
import ResultsTable from "../ResultsTable"
import "./MC.css";


class MC extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: [], a: '', c: '', m: '', x: ''};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        let results = [];
        let last_seed = seed;
        let generate = true;
        let i = 1;
        do{
            if(i === 1){
                this.setState({a: last_seed.a, c: last_seed.c, m: last_seed.m, x: last_seed.x0})
            }
            let resOperation = last_seed.a*last_seed.x0 + Number(last_seed.c);
            const generator = "X" + i + "=" + "(" + last_seed.a + "(" + last_seed.x0 +")" + "+" + last_seed.c + ")=" +
                resOperation + "mod" + last_seed.m;
            let operation = this.getOperation(resOperation, last_seed.m);
            const randomNum = operation.res;
            let ri = 0;
            if(last_seed.m > 0){
                ri = randomNum / last_seed.m;
            }
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
        document.getElementById("dat-mc").removeAttribute("class");
    }

    getOperation(number, mod){
        let ent = 0;
        let res = 0;
        if(mod > 0){
            ent = parseInt(number / mod);
            res = number % mod;
        }
        const operation = {ent:ent, res: res};
        return operation;
    }




    render(){
        const{ results } = this.state;
        return(
            <div className="with-top-navbar">
                <Header/>
                <div className="container-fluid container-fluid-spacious">
                    <h1>Metodo Congruencial </h1>
                    <AddSeedMCForm addSeed={this.calculateNumbers}/>
                    <h3 id="dat-mc" className="datos-mc">
                        Datos: x0 = {this.state.x}, a = {this.state.a}, c = {this.state.c}, m = {this.state.m}
                    </h3>
                    <ResultsTable results={results}/>
                </div>
            </div>

        );
    }

}


export default MC;