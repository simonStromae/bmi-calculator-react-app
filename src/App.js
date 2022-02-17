import React, {useEffect, useState} from 'react';
import ChartComponent from './Components/ChartComponent';
import Details from './Components/Details';

function App() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  
  const [bmi, setBmi] = useState([]);
  const [labelsChart, setLabelsChart] = useState([]);
  const [datasChart, setDatasChart] = useState([]);

  const [valid, setValid] = useState('disabled');

  const [bmiBackup, setBmiBackup] = useState([]);
  const [labelsBackup, setLabelsBackup] = useState([]);
  const [datasBackup, setDatasBackup] = useState([]);

  const calcBMI = (e) => {
    e.preventDefault();

    if(weight > 0 && height > 0){
      let h = height/100;
      let b = weight / (h*h)

      let result = {
        'weight':weight,
        'height':height,
        'bmi':b.toFixed(2),
        'date': getDate()
      }

      setBmi([...bmi, result])
      setLabelsChart([...labelsChart, result.date])
      setDatasChart([...datasChart, result.bmi])
    }
  }

  const removeElement = (el) => {
    let filteredBMI = bmi.filter(function(value, index){ 
      return index !== el;
    });

    let filteredLabels = labelsChart.filter(function(value, index){ 
      return index !== el;
    });
    
    let filteredDatas = datasChart.filter(function(value, index){ 
      return index !== el;
    });
    
    setBmiBackup(bmi);
    setBmi(filteredBMI);

    setLabelsBackup(labelsChart);
    setLabelsChart(filteredLabels);

    setDatasBackup(datasChart);
    setDatasChart(filteredDatas);
  }

  const comeBack = () => {
    setBmi(bmiBackup);
    setLabelsChart(labelsBackup);
    setDatasChart(datasBackup);
  }

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

  useEffect(() => {
    if(weight > 0 && height > 0){
      setValid('btn');
    }else{
      setValid('disabled');
    }
  }, [valid, weight, height])

  return (
    <div className="app">
     <div className="container">
       <h1 className="text-white text-center">Calculateur IMC</h1>
       <form onSubmit={calcBMI}>
         <div className='flex'>
           <div className="form-group">
            <label className='text-white'>Poids (kg)</label>
            <input className="form-control" min="0" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>

          <div className="form-group">
            <label className='text-white'>Taille (Cm)</label>
            <input className="form-control" min="0" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
         </div>

         <div className="flex form-group">
           <button className={valid} value="submit">Calculer</button>
         </div>
       </form>

        <div className=''>
          <ChartComponent datas={datasChart} labels={labelsChart} />
        </div>

        <h2 className='text-white text-center' style={{margin: '55px 0', fontSize:"35px"}}>Données sur 7 jours</h2>
       <div className="all-imc">
          {
            (bmi.length === 0) 
            ? <p className='text-white'>Aucune donnée disponible</p> 
            : (
              bmi.map((imc, key) => (
                <div className='text-white'>
                  <button onClick={() => removeElement(key)} className='close'>X</button>
                  <Details key={key} b={imc} />
                </div>
              ))
            )
          } 
       </div>

       <div className="flex form-group">
           <button onClick={comeBack} className="btn btn-danger" value="submit">Annuler</button>
        </div>
     </div>
    </div>
  );
}

export default App;
