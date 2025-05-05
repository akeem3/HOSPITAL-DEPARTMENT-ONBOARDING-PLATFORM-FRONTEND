import { getTutorialById, getFeedbackForTutorial } from "@/lib/data";
import { FeedbackForm } from "@/components/feedback-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/page-container";
import { VideoPlayer } from "@/components/video-player";

export default function TutorialPage({
  params,
}: {
  params: { tutorialId: string };
}) {
  const tutorial = getTutorialById(params.tutorialId);
  const feedback = getFeedbackForTutorial(params.tutorialId);

  if (!tutorial) {
    return (
      <PageContainer>
        <h1 className="mb-4 text-2xl font-bold">Tutorial not found</h1>
        <Link href="/tutorials">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tutorials
          </Button>
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link href="/tutorials">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tutorials
        </Button>
      </Link>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold">{tutorial.title}</h1>
        <p className="mb-6 text-muted-foreground">{tutorial.description}</p>

        {tutorial.videoUrl && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Tutorial Video</h2>
            <VideoPlayer
              url={tutorial.videoUrl}
              title={tutorial.title}
              poster={
                tutorial.thumbnail || "/placeholder.svg?height=400&width=800"
              }
            />
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Tutorial Content</h2>
          <Card className="shadow-sm">
            <CardContent className="prose max-w-none pt-6 dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Feedback</h2>
          <FeedbackForm tutorialId={params.tutorialId} />

          {feedback.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-medium">Recent Feedback</h3>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <Card key={item.id} className="shadow-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <p className="text-sm font-medium">
                              Rating: {item.rating}/5
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2">{item.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
