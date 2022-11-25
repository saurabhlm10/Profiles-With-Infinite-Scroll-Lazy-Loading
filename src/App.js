import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Profile from "./Components/Profile";

import { fetchMoreData } from "./utils/fetchMoreData";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [images, setImages] = useState([]);
  const [postNumber, setPostNumber] = useState(1);
  const dataFetchedRef = useRef(false);
  const [isFetching, setisFetching] = useState(false)

  const fetchData = async (updatedState, tempProfileArray, tempImageArray) => {
    console.log(updatedState);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedState}`
    );

    const data = await response.json();

    tempProfileArray.push(data);

    const response2 = await fetch(
      `https://avatars.dicebear.com/api/human/${updatedState}.svg`
    );

    const tempImage = response2.url;

    tempImageArray.push(tempImage);

    return [tempProfileArray, tempImageArray];
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    fetchMoreData({
      fetchData,
      postNumber,
      setPostNumber,
      profiles,
      setProfiles,
      images,
      setImages,
    });
  }, []);

  return (
    <>
      <div id="container">
        {profiles.map((profile, id) => (
          <Profile
            key={id}
            profile={profile}
            isLast={id === profiles.length - 1}
            id={id}
            images={images}
            profiles={profiles}
            postNumber={postNumber}
            setPostNumber={setPostNumber}
            setProfiles={setProfiles}
            setImages={setImages}
            fetchData={fetchData}
            isFetching={isFetching}
            setisFetching={setisFetching}
          />
        ))}
        {
          isFetching && <h1>Loading More Profiles...</h1>
        }
      </div>
    </>
  );
};

export default App;
