import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title, desc, image, newsUrl,author,Date} = this.props;

    // Check that desc is a string before using slice
    let restrictedDesc = typeof desc === "string" ? desc.slice(0, 80) : "";

    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={image ? image : "https://www.hindustantimes.com/ht-img/img/2023/04/04/1600x900/congress_files_part_3_1680602527599_1680602527835_1680602527835.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title.slice(0, 30)}</h5>
            
            <p className="card-text">{restrictedDesc}</p>
            <p className='card-text'><small class="text-muted">By {author ? author: "Unknown" } on {Date}</small></p>

            <a href={newsUrl} className="btn btn-sm btn-dark">Read News</a>
          </div>
        </div>
      </div>
    )
  }
}
