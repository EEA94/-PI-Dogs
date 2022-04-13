import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTemps, postDog } from "../redux/actions";
import styles from "../styles/Create.module.css"
import logoHome from "../assets/dogHome.png"
import preview from "../assets/preview.png"

const checkFieldsUndefined = (input)=>{
    if(input.temperament.length===0) return true;
    for(let el in input){
        return input[el]==="";
    }
}
const checkZero = (arr)=>{
return arr.find(n=> Number(n) === 0)
}
const checkIsNaN = (arr)=>{
return arr.filter(n=> isNaN(Number(n))).length
}
const checkNegatives = (arr)=>{
    return arr.filter(n=> Number(n) < 0).length
}
const checkMinMax = (min,max)=>{
    const nMin = Number(min);
    const nMax = Number(max);
    return nMin > nMax || nMin === nMax ? false : true;
}
const checkLimit = (arr,limit)=>{
return arr.filter(n=>n > limit).length
}

const validate = (input)=>{
    const {name, image, height_min, height_max, weight_min, weight_max, life_span} = input;
    const numbers = [height_min, height_max, weight_min, weight_max, life_span];
    const regexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/;
    // /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i
    const regexName = /^[a-zA-Z ]+$/;
    const errors = {};

if(checkFieldsUndefined(input)){
    errors.allFields = 'All fields are required'
}
if(checkZero(numbers)){
    errors.zero = 'Value must be greater than 0'
}
if(checkNegatives(numbers)){
    errors.negative = "Negative numbers are not valid"
}
if(checkIsNaN(numbers)){
    errors.isNan = "Some of the values is not a number"
}
if(!checkMinMax(height_min,height_max)){
    errors.heightMinMax = "The min can't be greater than the max"
}
if(!checkMinMax(weight_min,weight_max)){
    errors.weightMinMax = "The min can't be greater than the max"
}
if(checkLimit([height_min, height_max],150)){
    errors.heightLimit = "Height cant't be greter than 150 cm"
}
if(checkLimit([weight_min, weight_max],200)){
    errors.weightLimit = "Weight cant't be greter than 200 kg"
}
if(checkLimit([life_span],30)){
    errors.life_span = "Value greater than 30 is not valid"
}
if(!regexName.test(name) || name.length < 2 || name.length > 15){
    errors.name = "Invalid name format"
}
if(!regexUrl.test(image)){
    errors.image = "Only png, jpeg and jpg urls are accepted"
}
return errors;
}

export default function Create(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temps = useSelector((state)=>state.temps)
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        weight_min:'',
        weight_max:'',
        height_min:'',
        height_max:'',
        life_span:'',
        image:'',
        temperament:[],
    })
    
function handleChange(e){
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name] : e.target.value});
    setError(
        validate({
            ...input,
            [e.target.name] : e.target.value})
    )
}
function handleSelect(e){
    const {value} = e.target;
    if(!input.temperament.includes(value) && input.temperament.length<6){
        e.preventDefault();
        setInput({
            ...input,
            temperament:[...input.temperament,e.target.value]
        });
        setError(validate({
            ...input,
            temperament:[...input.temperament,e.target.value]
        }))
    }
    else{
        alert("You cannot enter more than 6 temperaments. You can't repeat temperaments.")
    }
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postDog(input))
    alert("Dog created successfully")
    setInput({
        name: '',
        weight_min:'',
        weight_max:'',
        height_min:'',
        height_max:'',
        life_span:'',
        image:'',
        temperament:[],
    });
    navigate('/home')
}

function handleDelete(e){
    e.preventDefault();
    setInput({
        ...input,
        temperament: input.temperament.filter(t=>t!==e.target.name)
    })
}

    useEffect(()=>{
        dispatch(getTemps())
    },[dispatch])

     return (
         <div className={styles.create}>
             <Link className={styles.dogsHenry} to={'/home'}><img className={styles.logoHome} src={logoHome} alt="logo"/>
             <h1 className={styles.henry}>HENRY'S DOGS</h1></Link>
             <div className={styles.subCreate}>
                <div className={styles.preview}>
                    <h2>Create your Dog</h2>
                    <img alt='preview' src={input.image.length ?
                    input.image :
                    preview}/>
                </div>
             <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
                 <div>
                     <label htmlFor="inputName">Name: </label>
                     <input id="inputName" type='text' value={input.name} name="name" placeholder="name..." onChange={(e)=>handleChange(e)}></input>
                     {error.name && <span className={styles.error}>{error.name}</span>}
                </div>
                <div>
                     <label htmlFor="inputWeight">Weight: </label>
                     <input id="inputWeight" type="number" value={input.weight_min} name="weight_min" placeholder="min..." onChange={(e)=>handleChange(e)}></input>
                     <input type="number" value={input.weight_max} name="weight_max" placeholder="max..." onChange={(e)=>handleChange(e)}></input>
                     {error.weightMinMax && <span className={styles.error}>{error.weightMinMax}</span>}
                     {error.weightLimit && <span className={styles.error}>{error.weightLimit}</span>}
                </div>
                <div>
                     <label htmlFor="inputHeight">Height: </label>
                     <input id="inputHeight" type="number" value={input.height_min} name="height_min" placeholder="min..." onChange={(e)=>handleChange(e)}></input>
                     <input type="number" value={input.height_max} name="height_max" placeholder="max..." onChange={(e)=>handleChange(e)}></input>
                     {error.heightMinMax && <span className={styles.error}>{error.heightMinMax}</span>}
                     {error.heightLimit && <span className={styles.error}>{error.heightLimit}</span>}
                </div>
                <div>
                    <label htmlFor="inputLife">Life span: </label>
                    <input id="inputLife" type="number" value={input.life_span} name="life_span" placeholder="life expectancy..." onChange={(e)=>handleChange(e)}></input>
                    {error.life_span && <span className={styles.error}>{error.life_span}</span>}
                    {error.zero && <span className={styles.error}>{error.zero}</span>}
                    {error.negative && <span className={styles.error}>{error.negative}</span>}
                    {error.isNan && <span className={styles.error}>{error.isNan}</span>}
                </div>
                <div>
                    <label htmlFor="Image">Image: </label>
                    <input id="Image" type="url" value={input.image} name="image" placeholder="image..." onChange={(e)=>handleChange(e)}></input>
                    {error.image && <span className={styles.error}>{error.image}</span>}
                </div>
                <label htmlFor="Temps">Temperaments: </label>
                <select id="Temps" className={styles.select} onChange={(e)=>handleSelect(e)}>
                    {!input.temperament.length ?
                    <option key='select' value="default">Select temperaments</option> :
                    <option key='select' disabled={true}>Select temperaments</option>
                }
        {
            temps?.map((t)=>{
                return(
                    <option value={t.name} key={t.id}>{t.name}</option>
                )
            })       
        }
        </select>
        
        <div className={styles.temperaments}>
             {input.temperament.map(temp=>
                    (<div className={styles.containerDlt} key={temp}>
                        <button className={styles.deleteBtn} name={temp} onClick={(e)=>handleDelete(e)}>x</button>
                    <p>{temp}</p>
                    </div>))
        }
         </div>
         {Object.keys(error).length ?
         <button className={styles.btnCreate} type="submit" disabled={true}>Create</button>:
         <button className={styles.btnCreateOn} type="submit">Create</button>
         }
         {error.allFields && <span className={styles.error}>{error.allFields}</span>}
         </form>
         </div>
         </div>
     )
}