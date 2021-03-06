import React from 'react';
import './AddSeedGMForm.css'

const AddSeedGMForm = ({addSeed = f => f}) => {
    let _x0, _a,_m;
    const submit = e => {
        e.preventDefault();
        if( _x0.value.trim().length <1 ||  _a.value.trim().length <1 ||  _m.value.trim().length <1){
            alert("Los campos no cuentan con la longitud requerida");
        }else if(isNaN(_x0.value) || isNaN(_a.value) || isNaN(_m.value) ){
            alert("El campo tiene que ser un número");
        }else if(parseInt(_m) <= parseInt(_a)){
            alert("El modulo (m) tiene que ser mayor que el multiplicador (a)");
        }else if(parseInt(_m) <= parseInt(_x0)){
            alert("El modulo (m) tiene que ser mayor que la semilla (x0)");
        }else {
            const seed = {x0: _x0.value, a: _a.value, m: _m.value};
            addSeed(seed);
            _x0.value = '';
            _x0.focus();
            _a.value = '';
            _a.focus();
            _m.value = '';
            _m.focus();
        }

    };

    return ( <form onSubmit ={submit} >
        <h2>Agregar Semilla</h2>
        <div className="form-group row">
            <label class="col-sm-1 col-form-label" style={{textAlign: "right", marginTop: "8px"}}>x0 = </label>
            <div class="col-sm-11">
                <input ref={input => _x0 = input} type="text" placeholder="x0 (semilla)" className="form-control" pattern="^[0-9]*$" required />
            </div>
        </div>
        <div className="form-group row">
            <label class="col-sm-1 col-form-label" style={{textAlign: "right", marginTop: "8px"}}>a = </label>
            <div class="col-sm-11">
                <input ref={input => _a = input} type="text" placeholder="a (multiplicador)" className="form-control" pattern="^[0-9]*$" required />
            </div>
        </div>
        <div className="form-group row">
            <label class="col-sm-1 col-form-label" style={{textAlign: "right", marginTop: "8px"}}>m = </label>
            <div class="col-sm-11">
                <input ref={input => _m = input} type="text" placeholder="m (módulo)" className="form-control" pattern="^[1-9][0-9]*$" required />
            </div>
        </div>
        <button className="btn btn-pill btn-primary center-block"> Generar </ button>
    </form> );
};

export default AddSeedGMForm;
