import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

export default function Community() {
  const { currentUser } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  // Fetch posts from Firestore when component mounts
   useEffect(() => {
    fetchAllPosts();
  }, []);
const fetchAllPosts = async () => {
    try {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      let postsList = postsSnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Fetch likes count for each post
      const postsWithLikes = await Promise.all(
        postsList.map(async (post) => {
          const likeCount = await countLikes(post.id);
          return { ...post, likes: likeCount };
        })
      );

      setPosts(postsWithLikes);

      // Load all likes for toggling UI
      const likesSnapshot = await getDocs(collection(db, "likes"));
      setLikes(likesSnapshot.docs.map((l) => ({ id: l.id, ...l.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const countLikes = async (postId) => {
const likesRef = collection(db, "likes");
const q = query(likesRef);

const res = await getDocs(q);

let likesList = res.docs.map((d) => ({
  id: d.id,
  ...d.data(),
}));
let l = 0;
// Loop correctly
for (let like of likesList) {
  if(like.postId === postId) {
    l++;
  }
}
    return l;
  };
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return; // If file is undefined, stop

    // Only save file name and type
    setSelectedFiles((prev) => [
      ...prev,
      { name: file.name, type: fileType },
    ]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return; // Check if there's post content

    const newPost = {
      author: currentUser?.email?.split("@")[0] || "Current User",
      email: currentUser?.email || "Current User",
      photo: "https://i.pravatar.cc/150?img=68",
      promo: "Promo 2024",
      company: "SUP'COM",
      content: postContent,
      files: selectedFiles.length > 0 ? selectedFiles : [], // Ensure files is always an array
      likes: 0,
      comments: 0,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "posts"), newPost); // Add new post to Firestore
      setPosts([newPost, ...posts]); // Update local posts array
      setPostContent(""); // Reset content
      setSelectedFiles([]); // Reset selected files
    } catch (error) {
      console.error("Error adding document:", error); // Catch any Firestore errors
    }
  };

const handleLike = async (postIndex) => {
  const post = posts[postIndex]; // Get the current post
  const postId = post.id; // Post ID (assumed you have `id` in each post)
  
  // Check if the user has already liked this post
  const existingLike = likes.find(
    (like) => like.postId === postId && like.userId === currentUser.email
  );
  console.log(existingLike);
  try {
    if (existingLike) {
      // If the user has already liked the post, remove the like
      const likeDocRef = doc(db, "likes", existingLike.id);
      console.log(likeDocRef) // Get the reference of the like document
      await deleteDoc(likeDocRef); // Delete the like from Firestore
      console.log("Like removed");
      // Decrease the post's like count locally
      const updatedPosts = [...posts];
      updatedPosts[postIndex].likes -= 1;
      setPosts(updatedPosts);
    } else {
      // If the user hasn't liked the post, add a like
      await addDoc(collection(db, "likes"), {
        postId: postId,
        userId: currentUser.email, // Use the current user's email as unique identifier
      });

      // Increase the post's like count locally
      const updatedPosts = [...posts];
      updatedPosts[postIndex].likes += 1;
      setPosts(updatedPosts);
    }

    // Update the likes state (fetch updated list of likes from Firestore)
    const updatedLikes = await getDocs(collection(db, "likes"));
    const likesList = updatedLikes.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLikes(likesList); // Set the new likes state
  } catch (error) {
    console.error("Error handling like:", error); // Catch any errors that occur
  }
};


  return (
    <div className="bg-light-grey min-h-screen pt-28 pb-10">
      <main className="max-w-[700px] mx-auto flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleCreatePost} className="flex gap-4">
            <img src="https://i.pravatar.cc/150?img=68" className="w-12 h-12 rounded-full" />
            <div className="flex-1 flex flex-col gap-3">
              <textarea
                rows="3"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="border border-gray-200 rounded-xl p-3 resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-3 text-gray-600">
                  <label className="cursor-pointer">
                    📷
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "image")} />
                  </label>
                  <label className="cursor-pointer">
                    📹
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, "video")} />
                  </label>
                  <label className="cursor-pointer">
                    📄
                    <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => handleFileChange(e, "document")} />
                  </label>
                </div>
                <button type="submit" className="bg-sup-blue text-white px-6 py-2 rounded-xl">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Display Posts from Firestore */}
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <img src={post.photo} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h4 className="font-semibold">{post.author}</h4>
                <p className="text-gray-500 text-sm">{post.promo} • {post.company}</p>
              </div>
            </div>

            <p className="mb-3">{post.content}</p>

            {post.files && post.files.map((f, i) => (
              <div key={i} className="mb-3">
                {f.type === "image" && <img src={`/images/${f.name}`} className="rounded-xl w-full" />}
                {f.type === "video" && <video src={`/videos/${f.name}`} controls className="rounded-xl w-full" />}
                {f.type === "document" && <a href={`/documents/${f.name}`} target="_blank" rel="noreferrer">{f.name}</a>}
              </div>
            ))}

            <div className="flex justify-between text-gray-500 text-sm mb-3">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleLike(idx)}>👍 Like</button>
              <button>💬 Comment</button>
              <button>↗️ Share</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
