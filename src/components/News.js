import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async() =>{
        props.setProgress(10); 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    }, [])

    // handlePrevClick = async ()=>{
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews()
    // }

    // handleNextClick = async ()=>{
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews()
    // }

    const fetchMoreData = async () =>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b97a971635794772af56cf16a6e97949&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(true)
    }

        return (
        <>
        <h2 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={articles.length <= totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
            <div className="row">
                {articles.map(article =>{
                    return <div className="col-md-4" key={article.url}>
                        <NewsItem  
                            title={article.title?article.title.slice(0,60):""} 
                            description={article.description?article.description.slice(0,80):""} 
                            imageUrl={!article.urlToImage?"https://www.livemint.com/lm-img/img/2023/07/08/600x338/Market_1688816833646.jpg":article.urlToImage} 
                            newsUrl={article.url}
                            author={article.author}
                            date={article.publishedAt}
                            source={article.source.name}
                        />
                    </div>
                })}
            </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
        </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News











// Class Based Component

// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: 8,
//         category: 'general',
//     }

//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//     }
    
//     capitalizeFirstLetter = (string)=>{
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     constructor(props){
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0,
//         }
//         document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
//     }

//     async updateNews(){
//         props.setProgress(10); 
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//         this.setState({loading:true});
//         let data = await fetch(url);
//         props.setProgress(30);
//         let parsedData = await data.json();
//         props.setProgress(70);
//         this.setState({
//             articles: parsedData.articles,
//             totalResults: parsedData.totalResults,
//             loading: false
//         });
//         props.setProgress(100);
//     }

//     async componentDidMount(){
//         this.updateNews();
//     }

//     // handlePrevClick = async ()=>{
//     //     this.setState({page: this.state.page - 1});
//     //     this.updateNews()
//     // }

//     // handleNextClick = async ()=>{
//     //     this.setState({page: this.state.page + 1});
//     //     this.updateNews()
//     // }

//     fetchMoreData = async () =>{
//         this.setState({page: this.state.page + 1})
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b97a971635794772af56cf16a6e97949&page=${this.state.page}&pageSize=${props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults,
//             loading: false
//         });
//     }

//     render() {

//         return (
//         <>
//         <h2 className='text-center' style={{margin: '35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(props.category)} Headlines</h2>
//         {/* {this.state.loading && <Spinner/>} */}

//         <InfiniteScroll
//             dataLength={this.state.articles.length} //This is important field to render the next data
//             next={this.fetchMoreData}
//             hasMore={this.state.articles.length <= this.state.totalResults}
//             loader={<Spinner/>}
//             >
//             <div className="container">
//             <div className="row">
//                 {this.state.articles.map(article =>{
//                     return <div className="col-md-4" key={article.url}>
//                         <NewsItem  
//                             title={article.title?article.title.slice(0,60):""} 
//                             description={article.description?article.description.slice(0,80):""} 
//                             imageUrl={!article.urlToImage?"https://www.livemint.com/lm-img/img/2023/07/08/600x338/Market_1688816833646.jpg":article.urlToImage} 
//                             newsUrl={article.url}
//                             author={article.author}
//                             date={article.publishedAt}
//                             source={article.source.name}
//                         />
//                     </div>
//                 })}
//             </div>
//             </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
//         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
//         </div> */}
//         </>
//         )
//     }
// }

// export default News