import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarverlService';
import { useState,useEffect , Component} from 'react';


const SingleComicPage = () => {
  const {comicId} = useParams()
  const [comic, setComic] = useState(null)
  const {loading, error, getComics, clearError} = useMarvelService();

  useEffect(()=>{
    updateComic()
  },[comicId])
    

  const updateComic = () =>{
      clearError()
      getComics(comicId).then(res => onComicLoaded(res))
  }
  const onComicLoaded = (comic) => {
    setComic(comic)
  }

    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comic) ? <View arr={comic}/> : null;
    return (
        <>
            {errorMessage}
              {spinner}
              {content}
        </>
    )
  }
  const View = ({arr}) => {
    const {title, description, pageCount, thumbnail, language, price} = arr
    return(
      <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
  }  


export default SingleComicPage;

