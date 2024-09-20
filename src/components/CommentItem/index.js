import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {item, onClickLike, onClickDelete} = props
  const {name, comment, date, initialClassName, id, isLike} = item

  const initialLetter = name.slice(0, 1).toUpperCase()
  const time = formatDistanceToNow(date)

  const onLike = () => {
    onClickLike(id)
  }

  const onDelete = () => {
    onClickDelete(id)
  }

  const likeImage = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClassName = isLike ? 'is-like' : 'like'

  return (
    <li className="list-item">
      <div className="initial-name-container">
        <div className={`initial-container  ${initialClassName}`}>
          <p className="initial">{initialLetter}</p>
        </div>
        <div>
          <div className="name-container">
            <h1 className="name">{name}</h1>
            <p className="time">{time} ago</p>
          </div>
          <p className="comment-description">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <button type="button" className="button" onClick={onLike}>
            <img src={likeImage} alt="like" />
          </button>
          <p className={likeClassName}>Like</p>
        </div>
        <button
          type="button"
          className="button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
