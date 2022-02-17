import React from 'react';

export default function Details({b}){
    return (
        <div className='imc'>
            <h4>IMC : {b.bmi}</h4>
            <ul className="detailsIMC">
                <li>Poids : {b.weight + ' kg'}</li>
                <li>Taille : {b.height + ' cm'}</li>
                <li>Date : {b.date}</li>
            </ul>
        </div>
    );
}