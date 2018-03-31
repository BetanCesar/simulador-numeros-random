import React, {Component} from 'react';
import Header from "../Header";
import AddSeedForm from "../AddSeedForm";
import ResultsTable from "../ResultsTable";

class MCC extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: []};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        let results = [];
        let last_seed = seed;
        for(let i = 1; i<100; i++){
            let generator = "X" + i + "=" + "(" + last_seed + ")2";
            let operation = last_seed * last_seed;
            let randomNum =this.getRandomNumber(operation);
            let ri = randomNum / 10000;
            last_seed = randomNum;
            let result = {generator:generator, operation:operation, randomNumber:randomNum, ri:ri};
            results.push(result);

        }
        this.setState({results});

    }

    getRandomNumber(number){
        let newNum = number;
        if(number.length%2 !== 0){
            newNum = '0' + number;
        }
        newNum = newNum.substring(3,newNum.length-2);
        return newNum;
    }


    render(){
        const{ results } = this.state;
        return(
            <div>
                <Header/>
                <h1>Metodo de los Centros Cuadrados</h1>
                <AddSeedForm addSeed={this.calculateNumbers}/>
                <ResultsTable results={results}/>

            </div>

        );
    }

}


export default MCC;
