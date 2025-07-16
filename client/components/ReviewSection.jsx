"use client";
import { useAllReviews } from "@/Hooks/useAllReviews";
import Marquee from "react-fast-marquee";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

function ReviewSection() {
  const { data: reviews, isLoading } = useAllReviews();
  console.log(reviews);
  if (isLoading) return <p className="text-center my-10">Loading reviews...</p>;

  return (
    <section className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        What Our Students Say
      </h2>
      <Marquee pauseOnHover gradient={false} speed={40}>
        {reviews?.map((review) => (
          <Card
            key={review?._id}
            className="w-80 mx-4 p-4 shadow-md border border-gray-200 bg-white"
          >
            <CardContent>
              <p className="text-gray-800 mb-3 italic">
                “
                {review.reviewText.length > 120
                  ? review.reviewText.slice(0, 120) + "..."
                  : review.reviewText}
                ”
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>⭐ {review?.rating}/5</span>
                <span>{review?.userEmail}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </section>
  );
}

export default ReviewSection;
