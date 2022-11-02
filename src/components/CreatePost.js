import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const { title, body } = values;
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  // handle post function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };
  // show created post
  const showCreatePost = () => {
    return (
      <>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h1 className="text-center text-white p-2 bg-dark">Create Post</h1>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Post Title"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Add post "
            id="floatingTextarea"
            // defaultValue={""}
            value={body}
            onChange={(e) => {
              setValues({ ...values, body: e.target.value });
            }}
          />
          <label htmlFor="floatingTextarea">write Post...</label>
        </div>
        <div className="d-flex align-items-end justify-content-end mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            {" "}
            Go Home
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-danger ms-4"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatePost()}</div>}</div>
    </div>
  );
};

export default CreatePost;
