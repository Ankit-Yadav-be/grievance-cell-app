import { useState, useContext, createContext, } from "react";

const FeedContext = createContext();

const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState("");
 

  return (
    <FeedContext.Provider value={[feed, setFeed]}>
      {children}
    </FeedContext.Provider>
  );
};

const useFeed = () => useContext(FeedContext);

export { useFeed, FeedProvider };
