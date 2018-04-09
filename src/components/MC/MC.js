import React, {Component} from 'react';
import Header from "../Header";
import AddSeedMCForm from "../AddSeedMCForm"
import ResultsTable from "../ResultsTable"
import "./MC.css";


class MC extends  Component{
    constructor(props) {
        super(props);
        this.state = { results: [], a: '', c: '', m: '', x: '', chi: '', teorico: 0, obtenido: 0, kol: '', teo: 0, obt: 0};
        this.calculateNumbers = this.calculateNumbers.bind(this);
    }


    calculateNumbers(seed){
        let results = [];
        const numbers = [];
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
                numbers.push(ri);
                results.push(newResult);
                i++;
            }
            if (i > 100){
                generate = false;
            }
        } while (generate);
        this.setState({results});
        let chi = this.chiCuadrada(numbers);
        this.setState({chi: chi});
        let kolmogrov = this.kolmogrov(numbers);
        this.setState({kol: kolmogrov});
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
    chiCuadrada(numbers){
        let nums = [];
        const chis = [3.84, 5.99, 7.81, 9.49, 11.07, 12.59, 14.07, 15.51, 16.92, 18.31, 19.68, 21.0, 22.4, 23.7, 25.0];
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
        const min = nums[0];
        const max = nums[nums.length-1];
        //Cambiar por numero de parametros
        const k = this.getK(nums.length);
        const v = k-1;
        const inter = (max - min)/k;
        //Division de clase
        let category = [];
        let min_interval = min;
        let max_interval = min + inter;
        const media = sum / nums.length;
        const lamda = 1/media;
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
        let feis = 0;
        for(let i = 1; i <= k; i++){
            let cont = 0;
            if(i===k){
                max_interval = max_interval + 0.0001;
            }
            while (nums[lastIndex] >= min_interval && nums[lastIndex] <= max_interval){
                cont++;
                lastIndex++;
            }
            const fei = ((max_interval-min_interval)/(max-min));
            const fei2 = (((fei-cont)*(fei-cont))/fei);
            const key={ k:i, clase:min_interval + "-" + max_interval, foi: cont, foir: cont/nums.length,
                fei: fei, fei2: fei2};
            category.push(key);
            min_interval = max_interval;
            max_interval = max_interval + inter;
            feis += fei2;
        }
        let teorico = chis[v-1];
        this.setState({teorico: teorico});
        this.setState({obtenido: feis});
        if(feis <= teorico){
            return "Los números generados Sí son aceptados con la prueba de Chi Cuadrada Uniforme con un grado de confianza " +
                "del 5%";
        }else{
            return "Los números generados No son aceptados con la prueba de Chi Cuadrada Uniforme con un grado de confianza " +
                "del 5%";
        }
    }
    getK(n){
        const resLog = Math.log(n) / Math.LN10;
        return Math.floor(1+3.222*resLog);
    }
    kolmogrov(numbers){
        const kols = [0.975, 0.84189, 0.7076, 0.62394, 0.56328, 0.51926, 0.48342, 0.45427, 0.43001, 0.40925, 0.39122,
            0.37543, 0.36143, 0.34890, 0.3375, 0.32733, 0.31796, 0.30936, 0.30143, 0.29408, 0.28724, 0.28087, 0.2749,
            0.26931, 0.26404, 0.25908, 0.25438, 0.24993, 0.24571, 0.2417, 0.23788, 0.23424, 0.2307, 0.22743, 0.22425,
            0.22119, 0.21826, 0.21544, 0.21273, 0.21012, 0.2076, 0.20517, 0.20283, 0.20056, 0.19837, 0.19625, 0.19420,
            0.19221, 0.19028, 0.18841];
        let nums = [];
        let ieses = [];
        let sn = [];
        let sn2 = [];
        let fx = [];
        let fx2 = [];
        for (let i = 0; i < numbers.length; i++){
            nums.push(numbers[i]);
            ieses.push(i+1);
        }
        nums.sort();
        const size = nums.length;
        for (let i = 0; i < size; i++){
            sn.push(ieses[i]/size);
            sn2.push((ieses[i]-1)/size);
        }
        for (let i = 0; i < size; i++){
            fx.push(Math.abs(sn[i]-nums[i]));
            fx2.push(Math.abs(nums[i]-sn2[i]));
        }
        fx.sort();
        fx2.sort();
        let d = 0;
        let dmax = fx[size-1];
        let dmin = fx2[size-1];
        let teorico = 0;
        if(size < 51){
            teorico = kols[size-1];
        }else{
            teorico = (1.36)/Math.sqrt(size);
        }
        if(dmax >= dmin){
            d = dmax;
        }else{
            d = dmin;
        }
        this.setState({teo: teorico});
        this.setState({obt: d});
        if(d <= teorico){
            return "Los números generados Sí son aceptados con la prueba de Kolmogrov-Smirnov Uniforme con un grado de confianza " +
                "del 5%";
        }else{
            return "Los números generados No son aceptados con la prueba de Kolmogrov-Smirnov Uniforme con un grado de confianza " +
                "del 5%";
        }
    }

    render(){
        const{ results } = this.state;
        return(
            <div className="with-top-navbar">
                <Header/>
                <div className="container-fluid container-fluid-spacious">
                    <h1>Metodo Congruencial </h1>
                    <AddSeedMCForm addSeed={this.calculateNumbers}/>
                    <div id="dat-mc" className="datos-mc">
                    <h3>
                        Datos: x0 = {this.state.x}, a = {this.state.a}, c = {this.state.c}, m = {this.state.m}
                    </h3>
                        <div className="col-sm-5 jumbotron">
                            <h4>
                                {this.state.chi}
                            </h4>
                            <h5>
                                Valor teórico: {this.state.teorico}
                            </h5>
                            <h5>
                                Valor obtenido: {this.state.obtenido}
                            </h5>
                        </div>
                        <div className="col-sm-5 col-sm-offset-1 jumbotron">
                            <h4>
                                {this.state.kol}
                            </h4>
                            <h5>
                                Valor teórico: {this.state.teo}
                            </h5>
                            <h5>
                                Valor obtenido: {this.state.obt}
                            </h5>
                        </div>
                    </div>
                    <ResultsTable results={results}/>
                </div>
            </div>

        );
    }

}


export default MC;