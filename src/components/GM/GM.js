import React, {Component} from 'react';
import Header from "../Header";
import AddSeedGMForm from "../AddSeedGMForm";
import ResultsTable from "../ResultsTable";
import "./GM.css";

class GM extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: [], a: '', m: '', x: ''};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }

    calculateNumbers(seed){
        let results = [];
        const numbers = [0.458,
            0.464,
            0.486,
            0.496,
            0.51,
            0.514,
            0.516,
            0.52,
            0.524,
            0.524,
            0.524,
            0.54,
            0.556,
            0.558,
            0.558,
            0.56,
            0.562,
            0.562,
            0.568,
            0.568,
            0.57,
            0.572,
            0.574,
            0.578,
            0.58,
            0.586,
            0.588,
            0.592,
            0.592,
            0.592,
            0.594,
            0.602,
            0.602,
            0.618,
            0.618,
            0.63,
            0.638,
            0.64,
            0.642,
            0.642,
            0.648,
            0.648,
            0.66,
            0.66,
            0.666,
            0.67,
            0.672,
            0.692,
            0.704,
            0.756];
        let last_seed = seed;
        let generate = true;
        let i = 1;
        do{
            if(i === 1){
                this.setState({a: last_seed.a, m: last_seed.m, x: last_seed.x0})
            }
            let resOperation = last_seed.a*last_seed.x0;
            const generator = "X" + i + "=" + "(" + last_seed.a + "(" + last_seed.x0 +")"+ ")=" +
                resOperation + "mod" + last_seed.m;
            let operation = this.getOperation(resOperation, last_seed.m);
            const randomNum = operation.res;
            const ri = randomNum / last_seed.m;
            let newResult = {generator:generator, operation: operation.ent + " + " + operation.res + "/" + last_seed.m,
                randomNumber:randomNum, ri:ri};
            last_seed.x0 = randomNum;
            if(results.filter(result => result.randomNumber === randomNum).length > 0){
                generate = false;
            }else {
                results.push(newResult);
                i++;
            }
        } while (generate);
        this.setState({results});
        this.chiCuadrada(numbers);
        document.getElementById("dat-gm").removeAttribute("class");
    }

    getOperation(number, mod){
        let ent = parseInt(number / mod);
        let res = number % mod;
        const operation = {ent:ent, res: res};
        return operation;
    }

    chiCuadrada(numbers){
        let nums = [];
        let sum = 0;
        /*for (let num in numbers) {
            nums.push(num.ri);
            sum += num.ri;
        }*/
        for (let i = 0; i < numbers.length; i++){
            nums.push(numbers[i]);
            sum += numbers[i];
        }
        nums.sort();
        console.log(nums);
        const min = nums[0];
        const  max = nums[nums.length-1];
        //Cambiar por numero de parametros
        const v = 3;
        const  k = this.getK(nums.length);
        const inter = (max - min)/k;
        const avg = sum / numbers.length;
        const lamda = 1/avg;
        //Division de clase
        let category = [];
        let  min_interval = min;
        let max_interval = min + inter;
        console.log("max interval " + max_interval);
        let lastIndex = 0;
        /*for(let i = 1; i <= k; i++){
            let cont = 0;
            console.log(nums[lastIndex]);
            while (nums[lastIndex].ri > min_interval && nums[lastIndex].ri <= max_interval){
                cont++;
                lastIndex++;
                console.log(cont);
            }
            const key={ k:i, clase:min_interval + "-" + max_interval, foia: cont, foir: cont/nums.length};
            category.push(key);
            min_interval = max_interval;
            max_interval = max_interval + inter;
        }*/

        for(let i = 1; i <= k; i++){
            let cont = 0;
            if(i===k){
                max_interval = max_interval + 0.1;
            }
            while (nums[lastIndex] >= min_interval && nums[lastIndex] <= max_interval){
                cont++;
                lastIndex++;
                console.log(cont);
            }
            const key={ k:i, clase:min_interval + "-" + max_interval, foia: cont, foir: cont/nums.length};
            category.push(key);
            min_interval = max_interval;
            max_interval = max_interval + inter;
        }
        console.log(category);


    }

    getK(n){
        const resLog = Math.log(n) / Math.LN10;
        return Math.floor(1+3.222*resLog);
    }




    render(){
        const{ results } = this.state;
        return(
            <div className="with-top-navbar">
                <Header/>
                <div className="container-fluid container-fluid-spacious">
                    <h1>Generador Multiplicativo </h1>
                    <AddSeedGMForm addSeed={this.calculateNumbers}/>
                    <h3 id="dat-gm" className="datos-gm">
                        Datos: x0 = {this.state.x}, a = {this.state.a}, m = {this.state.m}
                    </h3>
                    <ResultsTable results={results}/>
                </div>
            </div>
        );
    }

}


export default GM;