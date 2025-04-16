import React, { useState } from "react";

const emojiOptions = [
  "❤", "✌", "🙌", "👀", "🤟", "😁", "😍", "😅",
  "😢", "🥰", "😇", "🙃", "😎", "🤭", "🙏", "👍",
];

const loggedInUser = { username: "Admin User", isAdmin: true };

const CommunitySection = () => {
  const [comments, setComments] = useState([]);
  const [mainCommentInput, setMainCommentInput] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      author: loggedInUser.username,
      avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${loggedInUser.username}`,
      date: formatDate(new Date()),
      parentId,
      reactions: [],
      isReported: false,
    };
    setComments([...comments, newComment]);
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const reportComment = (id) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, isReported: true } : comment
    ));
  };

  const reactToComment = (id, emoji) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, reactions: [emoji] } : comment
    ));
  };

  const submitReply = (parentId, replyText) => {
    addComment(replyText, parentId);
  };

  const handleMainCommentSubmit = () => {
    if (mainCommentInput.trim()) {
      addComment(mainCommentInput);
      setMainCommentInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Community Section</h1>
      <div className="mb-6">
        <textarea
          value={mainCommentInput}
          onChange={(e) => setMainCommentInput(e.target.value)}
          placeholder="What are your thoughts?"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleMainCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Respond
        </button>
      </div>
      <div>
        {comments
          .filter(comment => !comment.parentId)
          .map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              comments={comments}
              onDelete={deleteComment}
              onReport={reportComment}
              onReact={reactToComment}
              onSubmitReply={submitReply}
            />
          ))}
      </div>
    </div>
  );
};

const Comment = ({ comment, comments, onDelete, onReport, onReact, onSubmitReply }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onSubmitReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-3">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <strong className="text-gray-800">{comment.author}</strong>
          <span className="text-sm text-gray-500"> · {comment.date}</span>
          {comment.isReported && (
            <span className="text-sm text-red-500 ml-2">Reported</span>
          )}
        </div>
      </div>
      <div className="mt-2 text-gray-700">
        <p>{comment.text}</p>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => setShowReactions(!showReactions)}
          className="text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          React
        </button>
        {comment.reactions.length > 0 && (
          <span>{comment.reactions.join(" ")}</span>
        )}
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          Reply
        </button>
        {loggedInUser.isAdmin && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-600 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => onReport(comment.id)}
          className="text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          Report
        </button>
      </div>
      {showReactions && (
        <div className="mt-2 flex space-x-2">
          {emojiOptions.map(emoji => (
            <button
              key={emoji}
              onClick={() => onReact(comment.id, emoji)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      {showReplyInput && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="What are your thoughts?"
            rows="2"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 space-x-2">
            <button
              onClick={handleReplySubmit}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Respond
            </button>
            <button
              onClick={() => setShowReplyInput(false)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="pl-6 border-l-2 border-gray-200 mt-4">
        {comments
          .filter(c => c.parentId === comment.id)
          .map(c => (
            <Comment
              key={c.id}
              comment={c}
              comments={comments}
              onDelete={onDelete}
              onReport={onReport}
              onReact={onReact}
              onSubmitReply={onSubmitReply}
            />
          ))}
      </div>
    </div>
  );
};

export default CommunitySection;