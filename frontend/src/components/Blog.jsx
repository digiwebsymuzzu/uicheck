import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://147.93.108.82:5000/api/allblogs/blogs"
        );
        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);
  const recentFour = blogs
    .sort((a, b) => new Date(b.blogdate) - new Date(a.blogdate))
    .slice(0, 4);
  return (
    <section className="blog py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-8 pe-xl-4">
            <div className="blog-item-wrapper">
              <div className="row">
                {blogs.map((blog) => (
                  <div key={blog._id} className="col-6 mb-20">
                    <div className="blog-item blog-border border-gray-100">
                      <Link
                        to={`/blog-details/${blog.slugurl}`}
                        className="w-100 h-100 rounded-16 overflow-hidden"
                      >
                        <img
                          src={blog.blogImage}
                          alt={blog.blogtitle}
                          className="cover-img"
                        />
                      </Link>
                      <div className="blog-item__content mt-24">
                        <div className="flex-blog flex-wrap gap-24 pb-10">
                          <div>
                            <span className="bg-main-50 text-light py-4 px-24 rounded-8 mb-16">
                              {blog.blogcategory}
                            </span>
                          </div>
                          <div className="flex-align">
                            <div className="flex-align flex-wrap gap-8">
                              <span className="text-lg primecolor">
                                <i className="ph ph-calendar-dots" />
                              </span>
                              <span className="text-sm primecolor">
                                <Link
                                  to={`/blog-details/${blog.slugurl}`}
                                  className="text-gray-500 hover-text-main-600"
                                >
                                  {new Date(blog.blogdate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>

                        <h6 className="text-2xl mb-24">
                          <Link to={`/blog-details/${blog.slugurl}`}>
                            {blog.blogtitle}
                          </Link>
                        </h6>
                        <p
                          className="text-gray-700 text-line-2"
                          dangerouslySetInnerHTML={{
                            __html: blog.blogparagraph.slice(0, 150) + "...",
                          }}
                        ></p>
                        <div className="pt-10">
                          <Link
                            to={`/blog-details/${blog.slugurl}`}
                            className="primecolor"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination Start */}
            {/* <ul className="pagination flex-align flex-wrap gap-16">
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-left" />
                </Link>
              </li>
              <li className="page-item active">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  01
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  02
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  03
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  04
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  05
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  06
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  07
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-right" />
                </Link>
              </li>
            </ul> */}
            {/* Pagination End */}
          </div>
          <div className="col-lg-4 ps-xl-4">
            {/* Search End */}
            {/* Recent Post Start */}
            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
              <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                Recent Posts
              </h6>
              {recentFour.map((blog) => (
                <div
                  key={blog._id}
                  className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
                >
                  <Link
                    to={`/blog-details/${blog.slugurl}`}
                    className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                  >
                    <img
                      src={blog.blogImage}
                      alt={blog.blogtitle}
                      className="cover-img"
                    />
                  </Link>
                  <div className="flex-grow-1">
                    <h6 className="text-lg">
                      <Link
                        to={`/blog-details/${blog.slugurl}`}
                        className="text-line-3"
                      >
                        {blog.blogtitle}
                      </Link>
                    </h6>
                    <div className="flex-align flex-wrap gap-8">
                      <span className="text-lg primecolor">
                        <i className="ph ph-calendar-dots" />
                      </span>
                      <span className="text-sm text-gray-500">
                        <Link
                          to={`/blog-details/${blog.slugurl}`}
                          className="text-gray-500 hover-text-main-600"
                        >
                          {new Date(blog.blogdate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Post End */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
