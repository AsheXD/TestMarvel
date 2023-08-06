import {useState,useEffect,useRef} from 'react';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarverlService';
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(()=>{
        onRequest(offset, true)
    },[])

    const onRequest = (offset, initial)=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset).then(res => onCharListLoaded(res))

    }

    
    const onCharListLoaded = (newCharList) => {

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset=> offset+9)
    }

    const itemRefs = useRef([])
  
    const focusOnItem = (id) =>{
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    const onCharListLessed = () => {

        setCharList(charList => charList.slice(0,-9))
        setNewItemLoading(false)
        setOffset(offset => offset-9)

    }

   const renderItems=(arr)=>{
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={(el)=> itemRefs.current[i] = el}
                    key={item.id} onClick={()=> {props.onCharSelected(item.id)
                                                      focusOnItem(i)}}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        const items = renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <div style={{display:'flex'}}>
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                   
                    onClick={() => onRequest(offset)}>
                        <div className="inner">load more</div>
                     </button>
                    <button className="button button__main button__long"
                            
                            onClick={() => onCharListLessed()}>
                        <div className="inner">hide prev</div>
                </button>
                </div>
                
            </div>
        )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;