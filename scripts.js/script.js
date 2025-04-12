//fetch API
import React, { useEffect, useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);       // Store fetched posts
  const [error, setError] = useState(null);     // Store error messages
  const [loading, setLoading] = useState(true); // Loading state for UX

  useEffect(() => {
    // Function to fetch blog posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if response is successful (status 200–299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);         // Update state with fetched posts
      } catch (err) {
        setError(err.message);  // Store error message for user-friendly display
      } finally {
        setLoading(false);      // Stop loading regardless of success/failure
      }
    };

    fetchPosts(); // Trigger the fetch on component mount
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>

      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Render posts only if there's no error and loading is done */}
      {!error && !loading && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1rem' }}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
