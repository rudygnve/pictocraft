import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { randomPrompts } from "@/data";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";

const create = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImg, setGeneratedImg] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedImg("");
    try {
      const response = await fetch("/api/v1/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setLoading(false);
      setGeneratedImg(`data:image/jpeg;base64,` + data?.data);
      toast.success("Image Generated Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Unable to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const item = randomPrompts[randomIndex];
    setPrompt(item);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, prompt, image: generatedImg }),
      });
      const data = await response.json();
      toast.success("Image Shared Successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      toast.error("Unable to submit image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Post - PictoCraft</title>
        <link rel="canonical" href={process.env.BASE_URL} />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="grow max-w-6xl mx-auto w-full py-5 sm:px-0 px-4">
        <div className="w-full flex flex-col gap-4 mb-10">
          <h1 className="text-3xl text-slate-900 font-bold">
            Create your post
          </h1>
          <span className="text-gray-800">
            Unleash your creativity and generate awe-inspiring images using the
            power of DALL-E AI, then proudly share your masterpieces with the
            vibrant community.
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <form
            onSubmit={handleGenerate}
            className="flex-none sm:w-[unset] w-full sm:flex-[2] flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 max-w-2xl w-ful">
              <span>Your Name:</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Example: John Doe"
                className="w-full rounded-lg text-base border-[2px] border-solid border-gray-200 h-[50px] px-3"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-2xl w-full">
              <div className="w-full flex flex-row items-center justify-between">
                <span>Prompt:</span>
                <button
                  title="Click to generate a random prompt"
                  onClick={handleRandom}
                  type="button"
                  className="py-1 px-2 rounded-lg bg-gray-200 text-[12px] text-slate-800 font-semibold"
                >
                  Surprise Me
                </button>
              </div>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                placeholder="A cat riding a bike"
                className="w-full rounded-lg text-base border-[2px] border-solid border-gray-200 h-[50px] px-3"
              />
            </div>
            <button
              disabled={loading || !name || !prompt ? true : false}
              className="py-2 px-5 w-full mt-4 sm:w-[fit-content] bg-primary text-white text-base font-semibold rounded-lg disabled:opacity-[0.6]"
            >
              Generate
            </button>
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-gray-800">
                Once you have created the image you want, you can share it with
                others in the community
              </span>
              <button
                onClick={handleShare}
                disabled={generatedImg ? false : true}
                type="button"
                className="w-full sm:w-[fit-content] py-2 px-5 bg-indigo-600 text-white text-base font-semibold rounded-lg disabled:opacity-[0.6]"
              >
                Share with the community
              </button>
            </div>
          </form>
          <div className="flex-none sm:w-[unset] w-full sm:flex-1 py-5">
            <div className="w-full overflow-hidden aspect-square border-[2px] border-solid border-gray-200 flex items-center justify-center rounded-xl">
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse relative" />
              ) : (
                <img
                  src={generatedImg ? generatedImg : "/assets/preview.png"}
                  className={
                    generatedImg ? "w-full" : "w-[100px] opacity-[0.3]"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default create;
