"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

interface BlogImage {
  id: number;
  image_url: string; // ✅ Match backend column
}

export default function AdminBlogPage() {
  const [images, setImages] = useState<BlogImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost/mch-api/admin/blog/");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch blog images", err);
      toast.error("Failed to load images");
    }
  };

  const handleAdd = async () => {
    if (!newImageUrl.trim()) {
      toast.warning("Please enter an image URL");
      return;
    }

    try {
      const res = await fetch("http://localhost/mch-api/admin/blog/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: newImageUrl }), // ✅ Match backend key
      });

      if (res.ok) {
        toast.success("Image added");
        setNewImageUrl("");
        fetchImages();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add image");
      }
    } catch (err) {
      console.error("Error adding image:", err);
      toast.error("Error adding image");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete this image?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost/mch-api/admin/blog/?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Image deleted");
        fetchImages();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      toast.error("Error deleting image");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">
        Manage Blog Slider
        <span className="block text-sm text-gray-300 mt-1">
          إدارة صور شريط المدونة
        </span>
      </h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-6">
        <Input
          placeholder="Enter image URL (e.g., /images/blog1.jpg)"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className="flex-1 min-w-0"
        />
        <Button
          onClick={handleAdd}
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
        >
          Upload Image
          <span className="block text-xs opacity-80">تحميل صورة</span>
        </Button>
      </div>

      {images.length === 0 ? (
        <p className="text-muted-foreground">
          No images added yet.
          <span className="block text-xs opacity-80">
            لا توجد صور مضافة حتى الآن
          </span>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border p-2 rounded shadow">
              <Image
                src={img.image_url} // ✅ Match backend key
                alt={`Blog image ${img.id}`}
                className="rounded w-full h-40 object-cover"
                width={400}
                height={160}
              />
              <Button
                variant="ghost"
                className="text-red-500 mt-2"
                onClick={() => handleDelete(img.id)}
              >
                Delete
                <span className="block text-xs opacity-80">حذف</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
