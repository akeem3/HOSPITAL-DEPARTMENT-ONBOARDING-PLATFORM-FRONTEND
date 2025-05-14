"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TutorialCard } from "@/components/tutorial-card";
import Link from "next/link";
import { getTutorials } from "@/lib/data";
import { PageContainer } from "@/components/page-container";
import Image from "next/image";
import type { Tutorial } from "@/lib/types";

export default function Home() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTutorials();
        setTutorials(data.slice(0, 3)); // Show first 3 as featured
      } catch (error) {
        console.error("Failed to load tutorials", error);
      }
    }

    fetchData();
  }, []);

  return (
    <PageContainer>
      <section className="w-full -mx-4 -mt-8 bg-gradient-to-r from-blue-700 to-blue-800 py-12 md:py-24">
        <div className="container-custom px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Welcome to Hospital Staff Onboarding
              </h1>
              <p className="max-w-[600px] text-blue-100 md:text-xl">
                Complete interactive tutorials to get familiar with hospital
                procedures and protocols.
              </p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 pt-4">
                <Link href="/tutorials">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 swedish-button"
                  >
                    Browse Tutorials
                  </Button>
                </Link>
                <Link href="/tutorials">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white text-white hover:bg-blue-700/20 swedish-button"
                  >
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-md h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Healthcare professionals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-blue-700">
          Featured Tutorials
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
            variant="outline"
            className="swedish-button hover:text-blue-700 hover:border-blue-300"
          >
            View All Tutorials
          </Button>
        </Link>
      </section>
    </PageContainer>
  );
}
