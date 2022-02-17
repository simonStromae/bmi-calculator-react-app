import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartComponent({datas, labels}){
    return (
        <div>
            <Line
                datasetIdKey='id'
                data={{
                    labels: labels,
                    datasets: [
                    {
                        label: 'IMC',
                        data: datas,
                        backgroundColor: '#919cd8'
                    }
                    ],
                }}
            />
            <h3 className='text-center text-white fw-3'>Date</h3>
        </div>
    );
}