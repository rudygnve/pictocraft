import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "@/common/Footer";
import Card from "./Card";
import { Helmet } from "react-helmet";

const Header = () => {
  const [search, setSearch] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.slice(0,20).map((post, i) => <Card key={post?._id} {...post} />);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/v1/getPost", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const allPosts = await response.json();
          setAllPosts(allPosts.reverse());
        } else {
          alert("Not Working!");
        }
        setIsLoading(false);
      } catch (err) {
        alert(err?.message);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.prompt.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>PictoCraft - Pictorial Perfection Engine</title>
        <link rel="canonical" href={process.env.BASE_URL} />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
      </Helmet>
      <Navbar />
      <div className="grow max-w-6xl mx-auto w-full py-5 px-4 mb-5">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-3xl text-slate-900 font-bold">
            Our Community Showcase
          </h1>
          <span className="text-gray-800">
            Explore an array of imaginative and visually breathtaking images
            crafted by DALL-E AI, awaiting your discovery.
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full mb-8 mt-12">
          <span>Search posts</span>
          <input
            onChange={(e) => handleSearchChange(e)}
            type="text"
            placeholder="Search"
            className="w-full rounded-lg text-base border border-soli border-gray-300 h-[50px] px-3"
          />
        </div>
        <div>
          {isLoading ? (
            <div className="w-full py-6 flex items-center justify-center">
              <img
                src="/assets/loading.png"
                className="w-[80px] animate-spin"
                alt=""
              />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {search && (
                <span className="text-xl text-slate-500 font-semibold">
                  Search results for "
                  <span className="text-slate-800">{search}</span>"
                </span>
              )}
              <div className="w-full mt-5 grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {search ? (
                  <RenderCards data={searchedResults} title="No post found" />
                ) : (
                  <RenderCards data={allPosts} title="No image generated yet" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Header;
