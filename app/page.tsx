"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TutorialCard } from "@/components/tutorial-card";
import Link from "next/link";
import { getTutorials } from "@/lib/data";
import { PageContainer } from "@/components/page-container";
import Image from "next/image";
import type { Tutorial } from "@/lib/types";

interface BlogImage {
  id: number | string;
  image_url: string;
}

export default function Home() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [blogImages, setBlogImages] = useState<BlogImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const tutorialsData = await getTutorials();
        setTutorials(tutorialsData.slice(0, 3));

        const res = await fetch("http://localhost/mch-api/admin/blog/");
        const blogData = await res.json();
        setBlogImages(blogData || []);
      } catch (error) {
        console.error("Failed to load homepage data", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [blogImages.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <PageContainer>
      {/* Blog Slider */}
      <section className="relative w-full h-[450px] overflow-hidden rounded-lg shadow-lg mb-12">
        {blogImages.length > 0 && (
          <div className="relative w-full h-full">
            <Image
              src={blogImages[currentIndex].image_url}
              alt={`Blog ${currentIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-700 ease-in-out"
              priority
            />

            {/* Overlay fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />

            {/* Captions */}
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold text-white drop-shadow">
                WELCOME TO MCH | مرحباً
              </h2>
              <p className="text-green-300 text-lg font-medium">
                Latest News & Blog | آخر الأخبار والمدونة
              </p>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {blogImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex
                      ? "bg-blue-500"
                      : "bg-blue-100 opacity-50"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Tutorials Section */}
      <section className="py-12">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-blue-500 inline-block pb-2">
          DEPARTMENTS - الأقسام
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={{
                id: tutorial.id,
                title: tutorial.title,
                description: tutorial.description,
                duration: tutorial.duration,
                image: tutorial.thumbnail,
              }}
            />
          ))}
        </div>

        <Link href="/tutorials" className="mx-auto mt-8 block w-fit">
          <Button
            variant="ghost"
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-700 transition"
          >
            View All - عرض الكل
          </Button>
        </Link>
      </section>
    </PageContainer>
  );
}
