"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check } from "lucide-react";

interface FeedbackFormProps {
  tutorialId: number | string;
}

export function FeedbackForm({ tutorialId }: FeedbackFormProps) {
  const [rating, setRating] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ tutorialId, rating, feedback });
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setRating(null);
      setFeedback("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Tutorial Feedback</CardTitle>
        <CardDescription>
          Help us improve this tutorial by providing your feedback.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">
                Thank you for your feedback!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your input helps us improve our tutorials.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>How would you rate this tutorial?</Label>
                <RadioGroup
                  value={rating || ""}
                  onValueChange={setRating}
                  className="flex flex-wrap space-x-2 sm:space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">Poor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">Fair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4">Very Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5">Excellent</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Additional Comments</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts about this tutorial..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={submitted || !rating}>
            Submit Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default FeedbackForm;
