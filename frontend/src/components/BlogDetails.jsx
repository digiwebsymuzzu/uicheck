import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaWhatsapp, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const BlogDetails = () => {
  const { slug } = useParams();
  const pageUrl = window.location.href;

  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const shareOptions = [
    {
      icon: <FaWhatsapp size={20} className="whatsapp" />,
      url: `https://api.whatsapp.com/send?text=${pageUrl}`,
    },
    {
      icon: <FaFacebook size={20} className="facebook" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    },
    {
      icon: <FaTwitter size={20} className="twitter" />,
      url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
    },
    {
      icon: <FaLinkedin size={20} className="linkedin" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    },
  ];

  // Fetch main blog by slug
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://147.93.108.82:5000/api/allblogs/blog/${slug}`
        );
        const data = await res.json();
        if (data.success) setBlog(data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [slug]);

  // Fetch recent 4 blogs
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(
          "https://147.93.108.82:5000/api/allblogs/blogs?limit=4"
        );
        const data = await res.json();
        if (data.success)
          setRecentBlogs(data.blogs.filter((b) => b.slugurl !== slug));
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      }
    };
    fetchRecentBlogs();
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <section className="blog-details py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          {/* Main Blog Content */}
          <div className="col-lg-8 pe-xl-4">
            <div className="blog-item-wrapper">
              <div className="blog-item blog-border border-gray-100">
                <div className="w-100 h-100 rounded-16 overflow-hidden">
                  <img
                    src={blog.blogImage}
                    alt={blog.blogtitle}
                    className="cover-img"
                  />
                </div>
                <div className="blog-item__content mt-24">
                  <div className="flex-blog flex-wrap gap-24">
                    <span className="bg-btn-yellow text-light py-4 px-24 rounded-8 mb-16">
                      {blog.blogcategory}
                    </span>

                    {/* Share Button */}
                    <div className="relative inline-block align-top">
                      <button
                        className="share-button rounded-5 mx-3 px-20 py-4"
                        onClick={() => setShowModal(true)}
                      >
                        <FiShare2 size={18} />
                      </button>
                      {showModal && (
                        <>
                          <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content-1 p-4">
                                <div className="modal-body d-flex flex-wrap justify-content-between">
                                  <div className="d-flex px-5">
                                    {shareOptions.map((opt, idx) => (
                                      <a
                                        key={idx}
                                        href={opt.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#000" }}
                                        className="px-4"
                                      >
                                        {opt.icon}
                                      </a>
                                    ))}
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="btn-close pb-4 custom-close-btn mx-5"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="modal-backdrop fade show"
                            onClick={() => setShowModal(false)}
                            style={{ zIndex: 1040 }}
                          ></div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex-blog flex-wrap gap-24 pb-10">
                    <div className="d-flex gap-24">
                      <div>
                        <span className="bg-btn-silver text-dark py-4 px-24 rounded-5 mb-10 mt-12">
                          By {blog.authorname}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-align flex-wrap gap-8">
                          <span className="text-lg primecolor">
                            <i className="ph ph-calendar-dots" />
                          </span>
                          <span className="text-sm primecolor">
                            {new Date(blog.blogdate).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h6 className="text-2xl mb-24">{blog.blogtitle}</h6>
                  <p
                    className="text-gray-700 text-line-2"
                    dangerouslySetInnerHTML={{ __html: blog.blogparagraph }}
                  ></p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Recent Blogs */}
          <div className="col-lg-4 ps-xl-4">
            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
              <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                Recent Posts
              </h6>
              {recentBlogs.map((b) => (
                <div
                  key={b._id}
                  className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
                >
                  <Link
                    to={`/blog-details/${b.slugurl}`}
                    className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                  >
                    <img
                      src={b.blogImage}
                      alt={b.blogtitle}
                      className="cover-img"
                    />
                  </Link>
                  <div className="flex-grow-1">
                    <h6 className="text-lg">
                      <Link
                        to={`/blog-details/${b.slugurl}`}
                        className="text-line-3"
                      >
                        {b.blogtitle}
                      </Link>
                    </h6>
                    <div className="flex-align flex-wrap gap-8">
                      <span className="text-lg primecolor">
                        <i className="ph ph-calendar-dots" />
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(b.blogdate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
