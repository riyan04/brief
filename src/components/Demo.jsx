import { useEffect, useState } from "react"
import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);

  // Now we know if we've any error
  // or we're fetching the request
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url
    });

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);

      setArticle(newArticle);
      
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className=" mt-16 w-full max-w-xl">
      <div className=" flex flex-col w-full gap-2">
        <form
          className=" relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon}
            alt="link-icon"
            className=" absolute left-0 my-2 ml-3 w-5"
          />
          <input 
            type="url"
            placeholder="Enter the URL of the article"
            value={article.url}
            onChange={(e) => setArticle({
              ...article,
              url: e.target.value
            })}
            required
            className=" url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-orange-400 peer-focus:text-orange-400"
          >
            Go
          </button>
        </form>
        {/* Browse the url history */}
        <div className=" flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img 
                    src={copied === item.url ? tick : copy}
                    alt="copy"
                    className=" w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className=" flex-1 font-santoshi text-blue-500 font-medium text-sm truncate ">{item.url}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img 
            src={loader}
            alt="loader"
            className=" w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className=" font-inter font-bold text-black text-center">
            Error Occured!
            <br />
            <span className=" font-santoshi font-normal text-gray-500">
              {error.data.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className=" flex flex-col gap-3">
              <h2 className=" font-santoshi font-bold text-gray-600">
                Article in <span className=" blue_gradient">Brief</span>
              </h2>
              <div className=" summary_box">
                <p className=" font-inter font-medium text-sm text-gray-600">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo