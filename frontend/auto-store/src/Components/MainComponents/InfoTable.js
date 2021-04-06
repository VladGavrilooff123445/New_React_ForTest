import React, {useState, useEffect} from 'react'
import axios from 'axios'



function InfoTable(){
    let [currency, setCurrency] = useState([]);
    const getCurrency = async ()=>{
        try{
            const Currency = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
            console.log(Currency.data);
            setCurrency(Currency.data);
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getCurrency();
    }, []);
    return (
        <table className="table">
            <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Валюта</th>
                  <th scope="col">Покупка</th>
                  <th scope="col">Продажа</th>
              </tr>
            </thead>
            {currency && currency.length > 0 &&
            <tbody>
            {currency.map((element) =>{
                return <tr>
                    <th scope="row">1</th>
                    <td>{element.ccy}</td>
                    <td>{Number(element.buy).toFixed(2)}</td>
                    <td colSpan="2">{Number(element.sale).toFixed(2)}</td>
                </tr>
            })}
            </tbody>
            }
        </table>
    );
}

export default InfoTable;