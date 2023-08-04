import { useSelector } from 'react-redux';
import './reviewCard.css'
import OpenModalButton from '../OpenModalButton';
import { DeleteReviewModal } from '../DeleteReviewModal';

export const ReviewCard = ({review}) => {

      const sessionUser = useSelector((state) => state.session.user);

      const c = new Date (review.createdAt);

      const cYear = c.getFullYear();
      const preCMonth = c.getMonth() + 1;
      const cMonth = preCMonth < 10 ? "0" + preCMonth : preCMonth;

      let month;

      if (cMonth == "01") month = "January"
      if (cMonth == "02") month = "February"
      if (cMonth == "03") month = "March"
      if (cMonth == "04") month = "April"
      if (cMonth == "05") month = "May"
      if (cMonth == "06") month = "June"
      if (cMonth == "07") month = "July"
      if (cMonth == "08") month = "August"
      if (cMonth == "09") month = "September"
      if (cMonth == "10") month = "October"
      if (cMonth == "11") month = "November"
      if (cMonth == "12") month = "December"

      const formatedCreatedDate = `${month} ${cYear}`


      if (review) {

            return (
                  <div id='review-card-item'>

                        <div id='review-firstname'>{review.User? review.User.firstName : sessionUser.firstName}</div>
                        <div id='review-date'>{formatedCreatedDate}</div>
                        <div id='review-review'>{review.review}</div>
                        {
                              review.userId == sessionUser.id ? <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal review={review} />}
                              />
                              : <p></p>

                        }

                  </div>



            )

      }



}
