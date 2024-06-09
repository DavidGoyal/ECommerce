/* eslint-disable react/prop-types */
import Profile from "../../assets/Profile.png"
import { Rating } from '@mui/material'

const ReviewCard = ({review}) => {

  const options = {
    size:"large",
    value: review.rating,
    readOnly: true,
    precision:0.5,
  };

  return (
    <div className='reviewCard'>
      <img src={Profile} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCard-span-text">{review.comments}</span>
    </div>
  )
}

export default ReviewCard