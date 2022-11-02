import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Post = () => {
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  const handleFetchData = (e) => {
    e.preventDefault();
    console.log("id", id);
    if (!id) {
      window.alert("Id not Provided!!");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("POst Deleted");
  };

  return (
    <>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <div className="">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Search By ID:
                </label>
                <input
                  type="number"
                  value={id}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setId(e.target.value)}
                />
                <button
                  onClick={handleFetchData}
                  type="submit"
                  className="btn btn-primary mt-3"
                >
                  Fetch Post
                </button>
                <button
                  onClick={() => navigate("/createpost")}
                  className="btn btn-warning ms-4 mt-3"
                  type="button"
                >
                  Create Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          id="floatingTextarea"
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  body: textBody,
                                  title: post[0].title,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                            className="btn btn-danger ms-4"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="card-text">{post[0].body}</p>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          onClick={() => {
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            );
                          }}
                          className="btn btn-primary"
                        >
                          {" "}
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger ms-4"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Post;
