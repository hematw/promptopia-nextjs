"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

export default function MyProfile() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const userPosts = await res.json();
      setPosts(userPosts);
    };
    if (session?.user) fetchPosts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed) {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE'
      })

      const filteredPosts = posts.filter(p => p._id !== post._id)
      setPosts(filteredPosts)
    }
  };

  return (
    <Profile
      name="My"
      desc={"Welcome to your personalized profile page."}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
