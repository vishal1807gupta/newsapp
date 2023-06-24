import React, { useState , useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
 
  // document.title = `${capitiliazeFirst(props.category)} - NewsMonkey`;

  const capitiliazeFirst=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    const updateNews = async()=>{  
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parseData = await data.json();
      props.setProgress(70);
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

    // async componentDidMount(){  // It is a reactLifeCycle runs after the constructor
    //  this.updateNews();  
     
    // }

    useEffect(()=>{
      const updateNews = async(props,page)=>{  
        props.setprogress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setprogress(100);
      }
      updateNews();
  
    },[])

    // const handlePrevClick = async()=>{

    //   // this.setState({
    //   //   page : this.state.page-1,
        
    //   // })
    //   // setTimeout(() => {
    //   //   this.updateNews()
    //   // }, 0);

    //   setPage(page-1);
    //   updateNews();
    // }

    // const handleNextClick = async()=>{

    //   // this.setState({
    //   //   page : this.state.page+1,
    //   // })

    //   // setTimeout(() => {
    //   //   this.updateNews()
    //   // }, 0);

    //   setPage(page+1);
    //   updateNews();
      
    // }

     const fetchMoreData =async()=>{

      // this.setState({
      //   page : ++this.state.page
      // })

      setPage(page+1);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(articles.concat(parseData.articles));
      setTotalResults(parseData.totalResults);
      setLoading(false);
      
    }

    return (
      <>
        <h2 className="text-center" style = {{margin: '35px 0px'}}>NewsMonkey - Top Headlines on {capitiliazeFirst(props.category)}</h2>

        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
        <div className="container my-3">
        <div className="row">
          {articles.map((element,index)=>{
            return  <div className="col-md-4" key = {index} >
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl={element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>
          })}
           </div>
           </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
          <button disabled= {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > (Math.ceil(this.state.totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
          </>
    );
}

News.defaultProps = {
  country : 'in',
  pageSize:9,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News;
