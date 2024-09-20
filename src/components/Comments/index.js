import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onChangeInputName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {comment, name} = this.state

    const numberClass = Math.floor(
      Math.random() * (initialContainerBackgroundClassNames.length - 1),
    )

    if (name === '' || comment === '') {
      alert('Please enter Details')
    } else {
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        isLike: false,
        date: new Date(),
        initialClassName: initialContainerBackgroundClassNames[numberClass],
      }

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  onClickLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLike: !eachItem.isLike}
        }
        return eachItem
      }),
    }))
  }

  onClickDelete = id => {
    const {commentsList} = this.state

    const filteredResults = commentsList.filter(eachItem => eachItem.id !== id)
    this.setState({
      commentsList: filteredResults,
    })
  }

  render() {
    const {comment, name, commentsList} = this.state
    const count = commentsList.length
    console.log(commentsList)
    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="comment-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image"
          />
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <p className="say-something">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="input-type"
              placeholder="Your Name"
              onChange={this.onChangeInputName}
              value={name}
            />
            <textarea
              rows="6"
              placeholder="Your Comment"
              className="text-area"
              onChange={this.onChangeComment}
              value={comment}
            />
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
        </div>
        <hr className="separator" />
        <p className="comment-count-description">
          <span className="span-element">{count}</span>Comments
        </p>
        <ul className="list-container">
          {commentsList.map(eachComment => (
            <CommentItem
              item={eachComment}
              key={eachComment.id}
              onClickLike={this.onClickLike}
              onClickDelete={this.onClickDelete}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
