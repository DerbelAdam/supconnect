import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import Footer from "../components/FooterNew";
export default function Community() {
  const { currentUser } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  // Fetch posts from Firestore when component mounts
   useEffect(() => {
    if (currentUser) {
      fetchAllPosts();
    }
  }, [currentUser]);
const fetchAllPosts = async () => {
    try {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      let postsList = postsSnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Trier les posts par date (les plus récents en premier)
      postsList.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });

      console.log("Posts récupérés depuis Firebase:", postsList);

      // Fetch likes count for each post
      const postsWithLikes = await Promise.all(
        postsList.map(async (post) => {
          const likeCount = await countLikes(post.id);
          return { ...post, likes: likeCount };
        })
      );

      console.log("Posts avec likes:", postsWithLikes);
      setPosts(postsWithLikes);

      // Load all likes for toggling UI
      const likesSnapshot = await getDocs(collection(db, "likes"));
      setLikes(likesSnapshot.docs.map((l) => ({ id: l.id, ...l.data() })));
    } catch (err) {
      console.error("Erreur lors du chargement des posts:", err);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
    
      <main className="max-w-2xl mx-auto flex flex-col gap-6 pt-24 pb-10 px-4 flex-grow">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-[#0A1F44] mb-2">
            Communauté <span className="text-[#E30613]">SUP'CONNECT</span>
          </h1>
          <p className="text-gray-600">Partagez vos idées et connectez-vous avec la communauté</p>
        </div>

        {/* Création de Post */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <form onSubmit={handleCreatePost}>
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {currentUser?.firstName?.[0]?.toUpperCase() || "U"}
              </div>
              <textarea
                rows="3"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Partagez vos pensées avec la communauté..."
                className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-xl p-4 resize-none transition-all outline-none"
              />
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="flex gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                  <span className="text-xl">📷</span>
                  <span className="text-sm font-medium text-gray-700">Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "image")} />
                </label>
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                  <span className="text-xl">📹</span>
                  <span className="text-sm font-medium text-gray-700">Vidéo</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, "video")} />
                </label>
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                  <span className="text-xl">📄</span>
                  <span className="text-sm font-medium text-gray-700">Doc</span>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => handleFileChange(e, "document")} />
                </label>
              </div>
              <button 
                type="submit" 
                className="bg-[#E30613] hover:bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
              >
                Publier
              </button>
            </div>
          </form>
        </div>

        {/* Liste des Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aucun post pour le moment. Soyez le premier à partager !</p>
          </div>
        ) : (
          posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-red-600 flex items-center justify-center text-white font-bold shadow-md">
                  {post.author?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{post.author}</h4>
                  <p className="text-gray-500 text-sm">{post.promo} • {post.company}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Files */}
              {post.files && post.files.map((f, i) => (
                <div key={i} className="mb-4">
                  {f.type === "image" && <img src={`/images/${f.name}`} className="rounded-xl w-full shadow-md" alt="post" />}
                  {f.type === "video" && <video src={`/videos/${f.name}`} controls className="rounded-xl w-full shadow-md" />}
                  {f.type === "document" && (
                    <a href={`/documents/${f.name}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      📄 {f.name}
                    </a>
                  )}
                </div>
              ))}

              {/* Post Stats */}
              <div className="flex items-center gap-6 text-gray-500 text-sm mb-4 pt-3 border-t">
                <span className="flex items-center gap-1">
                  <span className="text-red-500">❤️</span> {post.likes} j'aime
                </span>
                <span className="flex items-center gap-1">
                  <span>💬</span> {post.comments} commentaires
                </span>
              </div>

              {/* Post Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleLike(idx)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
                >
                  <span className="text-lg">👍</span> J'aime
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
                  <span className="text-lg">💬</span> Commenter
                </button>
              </div>
            </div>
          ))
        )}
      </main>
      
      <Footer />

    </div>
  );
}
