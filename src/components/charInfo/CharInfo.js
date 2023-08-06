import './charInfo.scss';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarverlService';
import { useState,useEffect } from 'react';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = (props) => {

    const [char, setChar] = useState(null)


    const {loading, error, getRandomCharacter, clearError} = useMarvelService();

    useEffect(()=>{
        updateChar()
    },[props.charId])
        

   const updateChar = () =>{
        const {charId} = props
        if (!charId){
            return
        }
        clearError()
        getRandomCharacter(charId).then(res => onCharLoaded(res))
    }
   const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
            <div className="char__info">
              {skeleton}
              {errorMessage}
              {spinner}
              {content}
            </div>
        )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (<>
      <div className="char__basics">
                    <img src={thumbnail} style={imgStyle} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                   {comics.length>0 ? comics.map((item,i) => {
                        return ( <li key={i} className="char__comics-item">
                        {item.name}
                    </li>)
                    }) : 'Sorry comics for this character didnt found'} 
                   
                </ul>
    </>)
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;