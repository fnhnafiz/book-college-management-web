"use client";
import { useAllReviews } from "@/Hooks/useAllReviews";
import Marquee from "react-fast-marquee";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Quote, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

function ReviewSection() {
  const { data: reviews, isLoading } = useAllReviews();
  console.log(reviews);

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-emerald-200 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-emerald-100 rounded w-96 mx-auto mb-8"></div>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-80 h-40 bg-emerald-100 rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // Get star distribution
  const starDistribution = reviews
    ? Array.from({ length: 5 }, (_, i) => {
        const starCount = i + 1;
        return {
          stars: starCount,
          count: reviews.filter((review) => review.rating === starCount).length,
        };
      }).reverse()
    : [];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover what our students say about their transformative college
            experiences. Real stories from real students.
          </p>

          {/* Rating Overview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Average Rating */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-600 mb-2">
                    {averageRating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(averageRating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Based on {reviews?.length || 0} reviews
                  </div>
                </div>

                {/* Star Distribution */}
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-2">
                    {starDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm font-medium">
                            {dist.stars}
                          </span>
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                reviews && reviews.length > 0
                                  ? (dist.count / reviews.length) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {dist.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Marquee */}
        <div className="mb-16">
          <Marquee pauseOnHover gradient={false} speed={40} className="py-4">
            {reviews?.map((review) => (
              <div key={review?._id} className="mx-4">
                <Card className="w-96 h-64 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border-0 overflow-hidden group">
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full bg-gradient-to-br from-white to-emerald-50 p-6 flex flex-col">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-12 h-12 text-emerald-600" />
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-semibold text-emerald-600">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text */}
                      <div className="flex-1 mb-4">
                        <p className="text-gray-700 text-sm leading-relaxed italic">
                          "
                          {review.reviewText.length > 140
                            ? review.reviewText.slice(0, 140) + "..."
                            : review.reviewText}
                          "
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {review.userEmail.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              {review.userEmail.split("@")[0]}
                            </div>
                            <div className="text-xs text-gray-500">
                              Verified Student
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-emerald-600 font-medium">
                            ✓ Verified
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Bottom Statistics */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Star className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-3xl font-bold text-amber-300 mb-1">
                {averageRating}
              </div>
              <div className="text-emerald-100 text-sm">Average Rating</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Users className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-3xl font-bold text-amber-300 mb-1">
                {reviews?.length || 0}
              </div>
              <div className="text-emerald-100 text-sm">Total Reviews</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-3xl font-bold text-amber-300 mb-1">
                {starDistribution.find((d) => d.stars === 5)?.count || 0}
              </div>
              <div className="text-emerald-100 text-sm">5-Star Reviews</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <TrendingUp className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-3xl font-bold text-amber-300 mb-1">
                {Math.round(
                  ((starDistribution.find((d) => d.stars === 5)?.count || 0) /
                    (reviews?.length || 1)) *
                    100
                )}
                %
              </div>
              <div className="text-emerald-100 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to start your own success story?
          </p>
          <Link href="/admission">
            <button className="cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
