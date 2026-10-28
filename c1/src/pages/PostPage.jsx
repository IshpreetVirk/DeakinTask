import { useState, useEffect, useRef } from "react";
import "./PostPage.css";

const MAX_TAGS = 3;

const initialValues = {
  title: "",
  description: "",
  abstract: "",
  articleText: "",
  tags: ""
};

const requiredFields = {
  question: [
    { name: "title", label: "Title" },
    { name: "description", label: "Problem description" }
  ],
  article: [
    { name: "title", label: "Title" },
    { name: "abstract", label: "Abstract" },
    { name: "articleText", label: "Article text" }
  ]
};

function parseTags(tagsText) {
  return tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
}

function validate(postType, values) {
  const errors = {};

  requiredFields[postType].forEach((field) => {
    if (values[field.name].trim() === "") {
      errors[field.name] = `${field.label} is required.`;
    }
  });

  const tagList = parseTags(values.tags);
  if (tagList.length === 0) {
    errors.tags = "Please add at least one tag.";
  } else if (tagList.length > MAX_TAGS) {
    errors.tags = `You can add a maximum of ${MAX_TAGS} tags.`;
  }

  return errors;
}

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }
  return (
    <p id={id} className="post-error" role="alert">
      {message}
    </p>
  );
}

function PostPage() {
  const [postType, setPostType] = useState("question");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);
  const closeButtonRef = useRef(null);

  const isQuestion = postType === "question";
  const tagCount = parseTags(values.tags).length;

  useEffect(() => {
    if (!popup) {
      return;
    }

    closeButtonRef.current.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setPopup(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [popup]);

  function handleTypeChange(event) {
    setPostType(event.target.value);
    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate(postType, values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setPopup({
        type: "error",
        title: "Post not sent",
        message:
          "Your post could not be sent. Please fix the highlighted fields and try again."
      });
      return;
    }

    setPopup({
      type: "success",
      title: "Post successful",
      message: `Your ${postType} "${values.title.trim()}" passed validation. Nothing has been saved yet.`
    });
    setValues(initialValues);
  }

  function closePopup() {
    setPopup(null);
  }

  return (
    <main className="post-page">
      <h1 className="post-bar">New Post</h1>

      <form className="post-form" onSubmit={handleSubmit} noValidate>
        <div className="post-type" role="radiogroup" aria-labelledby="post-type-label">
          <span id="post-type-label" className="post-type-label">
            Select Post Type:
          </span>
          <label className="post-radio">
            <input
              type="radio"
              name="postType"
              value="question"
              checked={isQuestion}
              onChange={handleTypeChange}
            />
            Question
          </label>
          <label className="post-radio">
            <input
              type="radio"
              name="postType"
              value="article"
              checked={!isQuestion}
              onChange={handleTypeChange}
            />
            Article
          </label>
        </div>

        <h2 className="post-bar">What do you want to ask or share</h2>
        <p className="post-intro">
          {isQuestion
            ? "Ask a question and describe your problem in as much detail as you can."
            : "Share an article with the community by adding a short abstract and the full text."}
        </p>

        <div className="post-field post-field-inline">
          <label htmlFor="post-title">Title</label>
          <div className="post-field-control">
            <input
              id="post-title"
              name="title"
              type="text"
              className="post-input"
              value={values.title}
              onChange={handleChange}
              placeholder={
                isQuestion
                  ? "Start your question with how, what, why, etc."
                  : "Enter a descriptive title"
              }
              required
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "post-title-error" : undefined}
            />
            <FieldError id="post-title-error" message={errors.title} />
          </div>
        </div>

        {isQuestion ? (
          <div className="post-field">
            <label htmlFor="post-description">Describe your problem</label>
            <textarea
              id="post-description"
              name="description"
              className="post-textarea post-textarea-large"
              value={values.description}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "post-description-error" : undefined}
            />
            <FieldError id="post-description-error" message={errors.description} />
          </div>
        ) : (
          <>
            <div className="post-field">
              <label htmlFor="post-abstract">Abstract</label>
              <textarea
                id="post-abstract"
                name="abstract"
                className="post-textarea post-textarea-abstract"
                value={values.abstract}
                onChange={handleChange}
                placeholder="Enter a 1-paragraph abstract"
                required
                aria-invalid={Boolean(errors.abstract)}
                aria-describedby={errors.abstract ? "post-abstract-error" : undefined}
              />
              <FieldError id="post-abstract-error" message={errors.abstract} />
            </div>

            <div className="post-field">
              <label htmlFor="post-article-text">Article Text</label>
              <textarea
                id="post-article-text"
                name="articleText"
                className="post-textarea post-textarea-article"
                value={values.articleText}
                onChange={handleChange}
                placeholder="Write your article here"
                required
                aria-invalid={Boolean(errors.articleText)}
                aria-describedby={errors.articleText ? "post-article-text-error" : undefined}
              />
              <FieldError id="post-article-text-error" message={errors.articleText} />
            </div>
          </>
        )}

        <div className="post-field post-field-inline">
          <label htmlFor="post-tags">Tags</label>
          <div className="post-field-control">
            <input
              id="post-tags"
              name="tags"
              type="text"
              className="post-input"
              value={values.tags}
              onChange={handleChange}
              placeholder={`Please add up to ${MAX_TAGS} tags to describe what your ${postType} is about e.g., Java`}
              required
              aria-invalid={Boolean(errors.tags)}
              aria-describedby={errors.tags ? "post-tags-hint post-tags-error" : "post-tags-hint"}
            />
            <p id="post-tags-hint" className="post-hint">
              Separate tags with commas ({tagCount}/{MAX_TAGS} used)
            </p>
            <FieldError id="post-tags-error" message={errors.tags} />
          </div>
        </div>

        <div className="post-actions">
          <button type="submit" className="post-button">
            Post
          </button>
        </div>
      </form>

      {popup && (
        <div className="post-popup-overlay" onClick={closePopup}>
          <div
            className={`post-popup post-popup-${popup.type}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-popup-title"
            aria-describedby="post-popup-message"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="post-popup-title" className="post-popup-title">
              {popup.title}
            </h3>
            <p id="post-popup-message" className="post-popup-message">
              {popup.message}
            </p>
            <button
              type="button"
              className="post-button post-popup-button"
              ref={closeButtonRef}
              onClick={closePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PostPage;