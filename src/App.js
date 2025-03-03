import React, { useState } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    setArticles([]);  // Clear previous results

    try {
      const response = await fetch(`http://127.0.0.1:5000/search?keyword=${keyword}`);
      const data = await response.json();
      console.log("API Response:", data);

      setArticles(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>Medium Article Search</h1>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px", cursor: "pointer" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h2>{article.title}</h2>
              <h4>{article.sub_title}</h4>
              <p><strong>Author:</strong> <a href={article.author_url} target="_blank" rel="noopener noreferrer">{article.author}</a></p>
              <p><strong>Reading Time:</strong> {article.reading_time}</p>
              <p><strong>Claps:</strong> {article.claps}</p>
              <p><strong>Article:</strong> {article.article_text.slice(0, 200)}...</p>
              {article.image_sources && article.image_sources.split(", ").map((img, idx) => (
                <img key={idx} src={img} alt="Article" style={{ width: "100px", margin: "5px" }} />
              ))}
            </div>
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
