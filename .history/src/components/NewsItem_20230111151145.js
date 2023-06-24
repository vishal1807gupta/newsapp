import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl?imageUrl:"https://c.ndtvimg.com/2022-11/688gcq5_amazon-office_625x300_14_November_22.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="badge bg-secondary">{source}</span></h5>
            <p className="card-text">
             {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
            
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
