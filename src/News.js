import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner.gif'
console.log("news page");

export default class News extends Component {
    
    constructor(){
        super();
        this.state={
            article:[],
            page:1,
            totalPages:2,
            loading:false
        }
    }

async updateNow(){
  this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9ec3d2a12df7457b82a60f661c6600ff&page=${this.state.page}&pageSize=${15}`;
  let data = await fetch(url);
  this.props.setProgress(30);

  let apidata = await data.json();
  this.props.setProgress(60);

  console.log(apidata);
  let pages = Math.ceil(apidata.totalResults/15);
  this.setState({article:apidata.articles,totalPages:pages,page:this.state.page,loading:true});
  this.props.setProgress(100);

}
async componentDidMount(){
  this.props.setProgress(50);

    this.updateNow();

}

handleNext=async()=>{
  
this.setState({page:this.state.page+1})
    this.updateNow();
}

handlePrev=async()=>{
  this.setState({page:this.state.page-1})
  this.updateNow();
}
  render() {

    return (
      <div className='container my-3' >
        <h2 style={{marginTop:"100px"}}>NewsMonkey - Top Headlines</h2>
        {this.state.loading===false && <img src={Spinner} style={{height:"60px",marginLeft:"500px"}} alt=''/> }
        <div className="row">

        {
          this.state.loading &&
            this.state.article.map((element)=>{
                return (
                
                <div className="col-md-4" key={element.url} >
                <NewsItems title={element.title} desc={element.description} image={element.urlToImage} newsUrl = {element.url} author={element.author} Date={element.publishedAt}/>
                </div>
                );
            })
            
        }

       
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
        <button disabled={this.state.page===this.state.totalPages} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        
        </div>

      </div>
    )
  }
}
