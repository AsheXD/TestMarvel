import './comicsList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarverlService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {

    const [comicsList , setComicsList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)
    const {loading, error, getAllComics, clearError} = useMarvelService()

    useEffect(()=>{
        onRequest(offset, true)
    },[])

    const onRequest = (offset, initial)=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        
        getAllComics(offset).then(res => onCharListLoaded(res))

    }

    const onCharListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(false)
        setOffset(offset=> offset+8)
        setComicsEnded(ended);
    }
    const renderComics=(arr)=>{
        const items =  arr.map((item,i) => {
          return ( <li className="comics__item"
                    tabIndex={0} key={i}>
                <Link to={`/comics/${item.id}`}>
                <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
                </Link>
                </li> )
                
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderComics(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
              {errorMessage}
                {spinner}
                {items}
            <button className="button button__main button__long"
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                disabled={newItemLoading} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;