import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { MasonryLayout, Spinner } from "../../components";
import { feedQuery, searchQuery } from "../../utils/data";
import "./Search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((res) => {
        setPins(res);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((res) => {
        setPins(res);
      });
    }
  }, [searchTerm]);

  if (loading) {
    return <Spinner message="Searching..." />;
  }

  return (
    <div>
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}

      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="search-not-found">
          <h2>No Pins Found!</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
