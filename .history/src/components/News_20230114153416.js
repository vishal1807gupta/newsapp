import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize:9,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitiliazeFirst=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page : 1,
      totalResults:0
    }
    document.title = `${this.capitiliazeFirst(this.props.category)} - NewsMonkey`;
  }

    async updateNews(){  
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseData = await data.json();
      this.props.setProgress(70);
      this.setState({
        articles : parseData.articles,
        totalResults : parseData.totalResults,
        loading : false
      });

      this.props.setProgress(100);
    }

    async componentDidMount(){  // It is a reactLifeCycle runs after the constructor
     this.updateNews();  
     
    }

    // handlePrevClick = async()=>{

    //   this.setState({
    //     page : this.state.page-1,
        
    //   })
    //   setTimeout(() => {
    //     this.updateNews()
    //   }, 0);
    // }

    // handleNextClick = async()=>{

    //   this.setState({
    //     page : this.state.page+1,
    //   })

    //   setTimeout(() => {
    //     this.updateNews()
    //   }, 0);
      
    // }

     fetchMoreData =async()=>{

      this.setState({
        page : ++this.state.page
      })

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles : this.state.articles.concat(parseData.articles),
        totalResults : parseData.totalResults,
        loading : false
      });
   
      
    }

 
  render() {
    return (
      <>
        <h2 className="text-center" style = {{margin: '35px 0px'}}>NewsMonkey - Top Headlines on {this.capitiliazeFirst(this.props.category)}</h2>

        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container my-3">
        <div className="row">
          {this.state.articles.map((element,index)=>{
            return  <div className="col-md-4" key = {index} >
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl={element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>
          })}
           </div>
           </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
          <button disabled= {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > (Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
          </>
    );
  }
}

export default News;
