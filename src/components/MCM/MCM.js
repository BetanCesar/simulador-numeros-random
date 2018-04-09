import React, {Component} from 'react';
import Header from "../Header";
import AddSeedMCForm from "../AddSeedMCForm";
import ResultsTable from "../ResultsTable";
import "./MCM.css";

class MCM extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: [], messages: [], a: '', c: '', m: '', x: ''};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        this.evaluateValues(seed);
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

    evaluateValues(seed){
        let messages = [];
        let cumple = true;

        if((seed.m) > 0) {
            if(this.mcd(seed.c, seed.m) === 1){
                messages.push("Cumple con primera condicion");
            }else {
                messages.push("No cumple con primera condicion ya que " + seed.c + "(c) y " + seed.m + "(m) no son primos relativos");
                cumple = false;
            }
        }else{
            messages.push("No cumple con primera condicion ya que " + seed.c + "(c) y " + seed.m + "(m) no son primos relativos");
            cumple = false;
        }
        if((seed.a - 1) > 1){
            if(this.mcd(seed.m, seed.a -1) !== 1){
                messages.push("Cumple con segunda condicion");
            }else {
                messages.push("No cumple con segunda condicion ya que no existe un número primo que divida a " + seed.m + "(m) y divida a " + seed.a + "(a)-1");
                cumple = false;
            }
        }else{
            messages.push("No cumple con segunda condicion ya que no existe un número primo que divida a " + seed.m + "(m) y divida a " + seed.a + "(a)-1");
            cumple = false;
        }

        if((seed.m % 4) === 0 && (seed.a - 1) % 4 === 0){
            messages.push("Cumple con tercera condicion");
        }else {
            messages.push("No cumple con tercera condicion ya que 4 no divide a " + seed.m + "(m) o 4 no divide a " + seed.a + "(a)-1");
            cumple = false;
        }
        this.setState({messages});
        if(cumple === true){
            document.getElementById("message").removeAttribute("class");
            document.getElementById("message").setAttribute("class", "statcard statcard-success p-a-md m-b");
        }else {
            document.getElementById("message").removeAttribute("class");
            document.getElementById("message").setAttribute("class", "statcard statcard-danger p-a-md m-b");
        }
        document.getElementById("dat-mcm").removeAttribute("class");
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
            <div className="with-top-navbar">
                <Header/>
                <div className="container-fluid container-fluid-spacious">
                    <h1>Metodo Congruencial Mixto </h1>
                    <div id="message" className="message-class">
                        <h3 class="statcard-number">
                            Comprobación Hull-Dobell
                        </h3>
                        <ul className="message-list">
                            {this.state.messages.map(m =>
                                <li>
                                    <span class="statcard-desc">{m}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <AddSeedMCForm addSeed={this.calculateNumbers}/>
                    <h3 id="dat-mcm" className="datos-mcm">
                        Datos: x0 = {this.state.x}, a = {this.state.a}, c = {this.state.c}, m = {this.state.m}
                    </h3>
                    <ResultsTable results={results}/>
                </div>
            </div>
        );
    }

}


export default MCM;
