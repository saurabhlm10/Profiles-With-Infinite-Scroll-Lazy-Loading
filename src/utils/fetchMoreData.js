export const fetchMoreData = async ({fetchData, postNumber, setPostNumber, profiles, setProfiles, images, setImages}) =>{
    var tempProfileArray;
  var tempImageArray;
  var tempProfileAndImageArray;

    let updatedState = postNumber;

    // console.log(updatedState);

    tempProfileArray = []
    tempImageArray = [] 
    for (let i = 0; i < 6; i++) {
      tempProfileAndImageArray = await fetchData(updatedState, tempProfileArray, tempImageArray);
      updatedState = updatedState + 1;
    }

    setProfiles([...profiles, ...tempProfileAndImageArray[0]])
    setImages([...images, ...tempProfileAndImageArray[1]])

    setPostNumber(postNumber + 6);
  }