import { useHttp } from "../hooks/http.hook"

const useMarvelService = ()=> {
  const {loading, request, error, clearError} = useHttp()
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=7ee028bbd62cdf03d1c3570ec1abaf23'
  const _offset = 210
  
  const getAllCharacters = async(offset=210) =>{
    const  res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`)
    return res.data.results.map(item => _transformCharacter(item))
  }
  const getRandomCharacter = async(id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0])
  }

  const getAllComics = async (offset=0) => {
    const res = await request (`${_apiBase}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
    return (res.data.results.map(item => _transformComics(item)))
  }
  const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const _transformCharacter = (char) =>{
    if (char.description.length===0){
      return {
            name:char.name,
            description:'Sorry data for this character didnt found',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            id:char.id,
            comics:char.comics.items.slice(0,9)
        }
    } else if (char.description.length>226) {
      return {
        name:char.name,
        description:char.description.slice(0,226) + '...',
        thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage:char.urls[0].url,
        wiki:char.urls[1].url,
        id:char.id,
        comics:char.comics.items.slice(0,9)
      }
    }   return {
          name:char.name,
          description:char.description,
          thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
          homepage:char.urls[0].url,
          wiki:char.urls[1].url,
          id:char.id,
          comics:char.comics.items.slice(0,9)
      }
    }

    const _transformComics = (comics) => {
      return {
        id: comics.id,
        title: comics.title,
        description: comics.description || "There is no description",
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
        thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
        language: comics.textObjects[0]?.language || "en-us",

        price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not available",
      };
    };


    return {loading, error, getAllCharacters,getRandomCharacter, clearError, getAllComics, getComics}
  }

export default useMarvelService