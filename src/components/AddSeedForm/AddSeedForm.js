import React from 'react';
import './AddSeedForm.css'

const AddSeedForm = ({addSeed = f => f}) => {
    let _seed;
    const submit = e => {
        e.preventDefault();
        if( _seed.value.trim().length <2){
            alert("Los campos no cuentan con la longitud requerida");
        }else if(isNaN(_seed.value)){
            alert("El campo tiene que ser un número");
        }else {
            addSeed(_seed.value);
            _seed.value = '';
            _seed.focus();
        }

    };

    return ( <form onSubmit ={submit} >
        <h2>Agregar Semilla</h2>
        <input ref={input => _seed = input} type="text" placeholder="Semilla" required />
        <button> Agregar </ button>
    </form> );
};

export default AddSeedForm;
