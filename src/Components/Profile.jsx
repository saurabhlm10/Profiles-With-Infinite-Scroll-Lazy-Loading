import { useRef, useEffect, useState } from 'react'
import { fetchMoreData } from '../utils/fetchMoreData'
import imageFile from "../image/350x150.png";


const Profile = ({ profile, isLast, id, images, profiles, postNumber, setPostNumber, setProfiles, setImages, fetchData, isFetching, setisFetching }) => {
    const profileRef = useRef()
    const imageRef = useRef()
    const [imageUrl, setImageUrl] = useState(imageFile)
    console.log(imageFile);

    useEffect(() => {
        if (!profileRef?.current) return;
        const observer = new IntersectionObserver(async ([entry]) => {
            // console.log(entry);
            if (isLast && entry.isIntersecting) {
                setisFetching(true)
                setTimeout(() => {

                    fetchMoreData({ fetchData, postNumber, setPostNumber, profiles, setProfiles, images, setImages })
                        .then(observer.unobserve(entry.target))
                    setisFetching(false)

                }, 500);
            }

        }, {
            // threshold: 1,
        })

        observer.observe(profileRef.current)

        const imageObserver = new IntersectionObserver(async ([entry]) => {
            if (entry.isIntersecting) {
                setImageUrl(entry.target.dataset.src)

            }

        })

        imageObserver.observe(imageRef.current)


    }, [profileRef, imageRef, isLast])

    return (
        <div key={id} className="profile" ref={profileRef}>
            <img
                ref={imageRef}
                src={imageUrl}
                data-src={images[id]}
                alt="profile-image" />
            <h5>{profile.title}</h5>
            <p>{profile.body}</p>
        </div>
    )
}

export default Profile