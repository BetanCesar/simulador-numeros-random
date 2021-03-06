import React, {Component} from 'react';
import Header from "../Header";
import AddSeedForm from "../AddSeedForm";
import ResultsTable from "../ResultsTable";
import "./MCC.css";

class MCC extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: [], seed: ''};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        let results = [];
        let last_seed = seed;
        let size = seed.toString().length;
        let generate = true;
        let i = 1;
        let div = "1";
        for (let j = 0; j< size ; j++){
            div += "0";
        }
        console.log(div);
        do{
            if(i === 1){
                this.setState({seed: last_seed})
            }
            let generator = "X" + i + "=" + "(" + last_seed + ")2";
            let operation = this.getOperation(last_seed * last_seed);
            let randomNum =this.getRandomNumber(operation, size);
            let ri = randomNum / div;
            last_seed = randomNum;
            let newResult = {generator:generator, operation:operation, randomNumber:randomNum, ri:ri};
            if(results.filter(result => result.randomNumber === randomNum).length > 0){
                generate = false;
            }else {
                results.push(newResult);
                i++;
            }
        } while (generate);
        this.setState({results});
        document.getElementById("dat-mcc").removeAttribute("class");
    }

    getOperation(number){
        let newNum = number.toString();
        if(newNum.length%2 !== 0){
            newNum = '0' + number;
        }
        return newNum;
    }

    getRandomNumber(number, size){
        let size2 = number.toString().length;
        let digit = (size2-size) / 2;
        number = number.substring(digit, (digit + size));
        return number;
    }


    render(){
        const{ results } = this.state;
        return(
            <div className="with-top-navbar">
                <Header/>
                <div className="container-fluid container-fluid-spacious">
                    <h1>Metodo de los Centros Cuadrados</h1>
                    <AddSeedForm addSeed={this.calculateNumbers}/>
                    <h3 id="dat-mcc" className="datos-mcc">
                        Semilla = {this.state.seed}
                    </h3>
                    <ResultsTable results={results}/>
                </div>
            </div>
        );
    }

}


export default MCC;
