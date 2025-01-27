"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
    );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [promptsData, setPromptsData] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPromptsData(data);
    };

    fetchPrompts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList data={promptsData} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
