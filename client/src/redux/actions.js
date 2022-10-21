import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


export function getDogs(){
    return async function(dispatch){
        const allDogs = await axios.get(`${axios.defaults.baseURL}/dogs`);
        return dispatch({type:'GET_DOGS', payload: allDogs.data})
    }
}

export function getTemps(){
    return async function(dispatch){
        const temps = await axios.get(`${axios.defaults.baseURL}/temperament`);
        return dispatch({type:'GET_TEMPS',payload: temps.data})
    }
}

export default function findDogs(name){
    return async function(dispatch){
        try {
            const dogs = await axios.get(`${axios.defaults.baseURL}/dogs?name=${name}`)
        return dispatch({type:'FIND_DOGS', payload:dogs.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export function findId(id){
    return async function(dispatch){
        const dogId = await axios.get(`${axios.defaults.baseURL}/dogs/${id}`)
        return dispatch({type:'GET_ID_DETAIL', payload: dogId.data})
    }
}

export function postDog(post){
    return async function(dispatch){
        const data = axios.post(`${axios.defaults.baseURL}/dog`, post)
        return data;
    }
}

export function filterDb(){
    return {type: 'FILTER_DB'}
}

export function filterApi(){
    return {type: 'FILTER_API'}
}

export function filterTemp(payload){
    return {type:'FILTER_TEMP', payload}
}

export function orderName(payload){
    return {type:'ORDER_NAME', payload}
}

export function orderWeight(payload){
    return {type:'ORDER_WEIGHT', payload}
}

export function orderHeight(payload){
    return {type:'ORDER_HEIGHT', payload}
}

export function clear(){
    return {type:'CLEAR'}
}