"use client";

import React, { useState } from "react";
import {
  FileText,
  ExternalLink,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Award,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResearchPaper() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample research papers data (you can replace this with your API call)
  const researchPapers = [
    {
      id: 1,
      title:
        "Machine Learning Applications in Healthcare: A Comprehensive Study",
      author: "Dr. Sarah Johnson",
      college: "Harvard Medical School",
      date: "2024-01-15",
      category: "Technology",
      abstract:
        "This research explores the revolutionary impact of machine learning algorithms in modern healthcare systems, focusing on diagnostic accuracy and treatment optimization.",
      link: "https://example.com/research1",
      downloads: 1250,
      citations: 45,
      featured: true,
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Urban Development",
      author: "Prof. Michael Chen",
      college: "MIT Energy Institute",
      date: "2024-02-20",
      category: "Environment",
      abstract:
        "An innovative approach to implementing renewable energy systems in metropolitan areas, addressing both environmental and economic challenges.",
      link: "https://example.com/research2",
      downloads: 980,
      citations: 32,
      featured: false,
    },
    {
      id: 3,
      title: "Quantum Computing: Breaking Barriers in Cryptography",
      author: "Dr. Emily Rodriguez",
      college: "Stanford University",
      date: "2024-03-10",
      category: "Technology",
      abstract:
        "This study examines the potential of quantum computing to revolutionize data security and encryption methods in the digital age.",
      link: "https://example.com/research3",
      downloads: 2100,
      citations: 78,
      featured: true,
    },
    {
      id: 4,
      title: "Psychological Impact of Social Media on Gen Z Students",
      author: "Dr. James Wilson",
      college: "Oxford University",
      date: "2024-01-28",
      category: "Psychology",
      abstract:
        "A comprehensive analysis of how social media platforms affect the mental health and academic performance of Generation Z students.",
      link: "https://example.com/research4",
      downloads: 1560,
      citations: 56,
      featured: false,
    },
    {
      id: 5,
      title: "Climate Change and Agricultural Innovation",
      author: "Prof. Maria Garcia",
      college: "UC Berkeley",
      date: "2024-02-14",
      category: "Environment",
      abstract:
        "Exploring cutting-edge agricultural techniques and biotechnology solutions to combat climate change effects on global food security.",
      link: "https://example.com/research5",
      downloads: 890,
      citations: 41,
      featured: false,
    },
    {
      id: 6,
      title: "Blockchain Technology in Financial Services",
      author: "Dr. Robert Kim",
      college: "Wharton School",
      date: "2024-03-05",
      category: "Finance",
      abstract:
        "An in-depth study of blockchain implementation in banking and financial services, focusing on security and efficiency improvements.",
      link: "https://example.com/research6",
      downloads: 1780,
      citations: 63,
      featured: true,
    },
  ];

  const categories = [
    "all",
    "Technology",
    "Environment",
    "Psychology",
    "Finance",
  ];

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPapers = researchPapers.filter((paper) => paper.featured);

  return (
    <div className="py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-4">
            Research Papers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover groundbreaking research from our partner colleges. Explore
            innovative studies that are shaping the future of education and
            technology.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or college..."
                  className="pl-10 h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  className="px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Papers Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            Featured Research
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPapers.map((paper) => (
              <div
                key={paper.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-emerald-600 text-sm font-medium">
                      {paper.category}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {paper.title}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{paper.author}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(paper.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {paper.abstract}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {paper.downloads} downloads
                    </span>
                    <span>{paper.citations} citations</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-600">
                      {paper.college}
                    </span>
                    <Button
                      className="bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                      onClick={() => window.open(paper.link, "_blank")}
                    >
                      <FileText className="w-4 h-4" />
                      Read Paper
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Papers Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            All Research Papers ({filteredPapers.length})
          </h3>

          {filteredPapers.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                No research papers found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-100"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              paper.featured
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {paper.category}
                          </span>
                          {paper.featured && (
                            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          )}
                        </div>

                        <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                          {paper.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{paper.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(paper.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {paper.abstract}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="font-medium text-emerald-600">
                            {paper.college}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {paper.downloads} downloads
                            </span>
                            <span>{paper.citations} citations</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <Button
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer"
                          onClick={() => window.open(paper.link, "_blank")}
                        >
                          <FileText className="w-4 h-4" />
                          Read Paper
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">
                {researchPapers.length}+
              </div>
              <div className="text-emerald-100">Research Papers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">
                {researchPapers
                  .reduce((sum, paper) => sum + paper.downloads, 0)
                  .toLocaleString()}
              </div>
              <div className="text-emerald-100">Total Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">
                {researchPapers.reduce(
                  (sum, paper) => sum + paper.citations,
                  0
                )}
                +
              </div>
              <div className="text-emerald-100">Total Citations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchPaper;
