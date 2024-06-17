import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    // articles= [
    //     {
    //     "source": {
    //       "id": "bbc-sport",
    //       "name": "BBC Sport"
    //     },
    //     "author": null,
    //     "title": "Pakistan vs Ireland LIVE: ICC T20 World Cup 2024 - cricket score, commentary, video highlights & updates",
    //     "description": "Pakistan play Ireland in the Men's T20 World Cup in Florida - follow text updates, in-play video highlights and radio commentary.",
    //     "url": "http://www.bbc.co.uk/sport/cricket/live/cerr4ekg8vxt",
    //     "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
    //     "publishedAt": "2024-06-16T14:37:16.1810113Z",
    //     "content": "Ireland: Andy Balbirnie, Paul Stirling (c), Lorcan Tucker (wk), Harry Tector, Curtis Campher, George Dockrell, Gareth Delany, Mark Adair, Barry McCarthy, Josh Little, Ben White.\r\nPakistan: Mohammad R… [+145 chars]"
    //   },
    //   {
    //     "source": {
    //       "id": "espn-cric-info",
    //       "name": "ESPN Cric Info"
    //     },
    //     "author": null,
    //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //     "publishedAt": "2020-04-27T11:41:47Z",
    //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //   },
    //   {
    //     "source": {
    //       "id": "espn-cric-info",
    //       "name": "ESPN Cric Info"
    //     },
    //     "author": null,
    //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //     "publishedAt": "2020-03-30T15:26:05Z",
    //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //   }
    // ]
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=69e5027d5fd94101943b2aa85e47a98f&page=1pageSize=20";
        let data = await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }
    handlePrev= async()=>{
      let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=69e5027d5fd94101943b2aa85e47a98f&page=${this.state.page - 1}`;
      let data = await fetch(url);
      let parsedData=await data.json();
      this.setState({
       
        page: this.state.page - 1,
        articles: parsedData.articles
      })
    }

    handleNext= async()=>{
      let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=69e5027d5fd94101943b2aa85e47a98f&page=${this.state.page + 1}`;
      let data = await fetch(url);
      let parsedData=await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  render() {
    return (
      <div className='container my-3'> 
       <h2>NewsPanda-Top Headlines</h2>
       
       <div className="row">
       {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
       })}

        

        </div>
        <div className="container d-flex justify-content-between my-3" >
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News
