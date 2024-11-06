import React from 'react'

const NewsItem =(props)=> {

  
    let {title,description, imgUrl,newsUrl, author, date,source}  = props;
    return (
      <div className='my-3'>
        <div className="card h-100" >
          <div>
          <span className=" badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>{source}</span>
          </div>
        
            <img src={!imgUrl?"https://assets2.cbsnewsstatic.com/hub/i/r/2023/12/05/7302b750-d95c-41eb-847b-9141e0ed5204/thumbnail/1200x630/45b9b1c4aa9f60ebd7fec0d6df17d8cd/gettyimages-1657389394.jpg?v=170b469460f9b5b4a2670b02bb591e2d":imgUrl} className="card-img-top " alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className='text-muted'>By {!author?"Unkown":author} on {new Date (date).toGMTString()} </small></p>
                <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
 