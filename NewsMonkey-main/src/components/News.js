import React, { useEffect ,useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


const News =(props)=> {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
 


  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;

    updateNews();

  },[])
  

  const handlePrevClick = async ()=>{
  
    setpage(page-1);
   updateNews();

  }


  const handleNextClick = async ()=>{
   setpage(page+1);
   updateNews();
  }

    return (
      <div >
        <div className="container my-3 ">
            <h1 className='text-center 'style={{fontFamily:'s',marginTop:'90px'}} >NewsMonkey - Top headlines</h1>
            {loading && loading && <Spinner/>}
            
            <div className="row">
            {!loading && articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem  title ={element.title?element.title.slice(0,40):""}description = {element.description?element.description.slice(0,100):""} imgUrl ={element.urlToImage} newsUrl={element.url} author= {element.author} date= {element.publishedAt} source = {element.source.name}/>
              </div>
            })}   
            </div> 
            <div className="container d-flex justify-content-end my-3">
            <button disabled={page<=1}type="button" className="btn btn-dark mx-2" onClick={handlePrevClick}> &larr; Previous</button>
            <button disabled={page+1 > Math.ceil(totalResults/21)}type="button" className="btn btn-dark " onClick={handleNextClick}>Next &rarr;</button>
              
            </div>
        </div>
      </div>
    )

}
News.defaultProps = {
  country : 'in',
  pageSize: 12,
  category:'general'
}
News.propTypes = {
  contry : PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News
