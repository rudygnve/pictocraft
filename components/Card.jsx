import FileSaver from "file-saver";
import React from "react";

const Card = ({ _id, imageUrl, name, prompt }) => {
  const handleDownload = (_id, imageUrl) => {
    FileSaver.saveAs(imageUrl, `${_id}.jpg`);
  };

  return (
    <div className="group w-full h-full relative rounded-xl overflow-hidden shadow-lg">
      <img src={imageUrl} className="w-full" alt={prompt} />
      <div className="absolute bottom-2 left-2 p-2 bg-[#10131f] rounded-md right-2 hidden group-hover:flex flex-col gap-5">
        <span className="text-xs text-white font-medium">{prompt}</span>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[25px] aspect-square bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs uppercase font-bold">
                {name[0]}
              </span>
            </div>
            <span className="text-[11px] text-white font-semibold">{name}</span>
          </div>
          <div onClick={() => handleDownload(_id, imageUrl)}>
            <img
              className="w-[25px] cursor-pointer"
              src="/assets/download.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
