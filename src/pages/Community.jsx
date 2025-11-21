import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const { currentUser } = useAuth();

  const [activeNav, setActiveNav] = useState("feed");
  const [postContent, setPostContent] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ahmed Khalil",
      photo: "https://i.pravatar.cc/150?img=12",
      promo: "Promo 2015",
      company: "Google",
      time: "2 hours ago",
      content:
        "Excited to share that our team just launched a new AI feature! 🚀",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: "Salma Mansour",
      photo: "https://i.pravatar.cc/150?img=45",
      promo: "Promo 2013",
      company: "Microsoft",
      time: "5 hours ago",
      content:
        "Just finished an amazing workshop on product management. Would love to hear your opinions!",
      image: null,
      likes: 42,
      comments: 15,
    },
    {
      id: 3,
      author: "Youssef Ben Ali",
      photo: "https://i.pravatar.cc/150?img=33",
      promo: "Promo 2016",
      company: "Meta",
      time: "1 day ago",
      content:
        "Check out our latest ML research paper. Link in comments! 📊",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      likes: 67,
      comments: 23,
    },
  ]);

  const suggestedGroups = [
    { id: 1, name: "AI & Machine Learning", members: 234 },
    { id: 2, name: "Cybersecurity Experts", members: 189 },
    { id: 3, name: "Web Development", members: 421 },
    { id: 4, name: "Data Science Hub", members: 312 },
  ];

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: currentUser?.email?.split("@")[0] || "Current User",
      photo: "https://i.pravatar.cc/150?img=68",
      promo: "Promo 2024",
      company: "SUP'COM",
      time: "Just now",
      content: postContent,
      image: null,
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="bg-light-grey min-h-screen pt-28 pb-10">
      <div className="max-w-[1400px] mx-auto px-5 grid grid-cols-[240px_1fr_340px] gap-6 
                      xl:grid-cols-[200px_1fr_300px] 
                      lg:grid-cols-1">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:hidden xl:block bg-white rounded-2xl p-4 shadow-xl h-fit sticky top-28">
          <nav className="flex flex-col">
            {["feed", "groups", "members"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium border-l-4 transition-all
                ${activeNav === tab
                    ? "border-sup-red bg-sup-light-blue text-sup-red"
                    : "border-transparent text-sup-blue hover:bg-sup-light-blue hover:border-sup-blue"
                  }`}
              >
                <span className="text-xl">
                  {tab === "feed" ? "📰" : tab === "groups" ? "👥" : "👤"}
                </span>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </aside>

        {/* FEED COLUMN */}
        <main className="flex flex-col gap-6 max-w-[700px] mx-auto">
          {/* CREATE POST */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <form onSubmit={handleCreatePost} className="flex gap-4">
              <img
                src="https://i.pravatar.cc/150?img=68"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  rows="3"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share your thoughts with the community..."
                  className="border border-gray-200 rounded-xl p-3 focus:outline-sup-blue 
                             resize-none text-sm"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 text-gray-500">
                    <button type="button">📷</button>
                    <button type="button">📹</button>
                    <button type="button">📄</button>
                  </div>
                  <button
                    type="submit"
                    className="bg-sup-blue text-white px-6 py-2 rounded-xl font-semibold 
                               hover:bg-blue-900 transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* POSTS */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.photo}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sup-blue">{post.author}</h4>
                  <p className="text-gray-500 text-sm">
                    {post.promo} • {post.company} • {post.time}
                  </p>
                </div>
                <button className="text-gray-400 text-2xl">⋯</button>
              </div>

              <p className="text-sup-blue mb-3">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  className="rounded-xl w-full mb-3"
                />
              )}

              <div className="flex justify-between text-gray-500 text-sm mb-3">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              <div className="h-[1px] bg-gray-200 mb-3" />

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="py-2 rounded-xl text-gray-600 hover:bg-light-grey"
                >
                  👍 Like
                </button>
                <button className="py-2 rounded-xl hover:bg-light-grey">
                  💬 Comment
                </button>
                <button className="py-2 rounded-xl hover:bg-light-grey">
                  ↗️ Share
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:hidden xl:block flex flex-col gap-6 sticky top-28 h-fit">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-0 overflow-hidden text-center">
            <div className="h-20 bg-gradient-to-r from-sup-blue to-sup-red"></div>

            <img
              src="https://i.pravatar.cc/150?img=68"
              className="w-20 h-20 rounded-full border-4 border-white mx-auto -mt-10"
            />

            <h3 className="text-lg font-semibold text-sup-blue mt-3">
              {currentUser?.email?.split("@")[0] || "User"}
            </h3>

            <p className="text-gray-500 text-sm">Promo 2024</p>
            <p className="text-gray-500 text-sm mb-4">SUP'COM Student</p>

            <div className="flex justify-around border-t p-4">
              <div>
                <p className="font-bold text-sup-blue">342</p>
                <p className="text-xs text-gray-400">Connections</p>
              </div>
              <div>
                <p className="font-bold text-sup-blue">28</p>
                <p className="text-xs text-gray-400">Posts</p>
              </div>
            </div>
          </div>

          {/* GROUPS */}
          <div className="bg-white rounded-2xl shadow-xl p-5">
            <h3 className="text-lg font-semibold text-sup-blue mb-4">
              Suggested Groups
            </h3>

            {suggestedGroups.map((g) => (
              <div
                key={g.id}
                className="flex justify-between items-center border-b last:border-0 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sup-light-blue rounded-xl flex items-center justify-center text-xl">
                    👥
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-sup-blue">
                      {g.name}
                    </h4>
                    <p className="text-xs text-gray-500">{g.members} members</p>
                  </div>
                </div>

                <button className="bg-sup-red text-white px-4 py-1.5 rounded-xl text-sm hover:bg-red-700">
                  Join
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
