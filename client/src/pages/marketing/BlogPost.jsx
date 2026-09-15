import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';
import { BLOG_POSTS } from './Blog';

/**
 * BlogPost.jsx — Phase 6 Section G (Step 48)
 * Route: /resources/blog/:slug
 * Purpose: Full-length article template dynamically rendering the post matched by :slug.
 */
export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — MedFlow AI`;
    } else {
      document.title = "Article Not Found — MedFlow AI";
    }

    const elements = document.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[60vh] bg-white text-ink-900 py-20 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            404 • NOT FOUND
          </Badge>
          <h1 className="text-3xl font-serif font-bold text-ink-950">
            Article Not Found
          </h1>
          <p className="text-sm text-gray-600 font-sans">
            The requested article could not be found or may have been relocated.
          </p>
          <Link to="/resources/blog">
            <Button variant="primary">
              ← Return to Blog Index
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const otherPost = BLOG_POSTS.find((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* 1. ARTICLE HEADER & BREADCRUMB */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/resources/blog"
              className="text-xs font-mono uppercase tracking-wider text-gray-600 hover:text-black hover:underline"
            >
              ← Back to all articles
            </Link>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              {post.category}
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-500">
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-600 pt-2 border-t border-gray-200">
            <span>Author: <strong>{post.author}</strong></span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY CONTENT */}
      <article className="reveal-section py-14 px-4 max-w-4xl mx-auto space-y-10 font-sans leading-relaxed text-gray-800">
        {/* Lead Excerpt */}
        <div className="p-6 bg-gray-50 border-l-4 border-l-ink-900 border-y border-r border-gray-200 rounded-r text-base sm:text-lg text-ink-950 font-serif italic">
          "{post.excerpt}"
        </div>

        {/* Structured Sections */}
        {post.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 pt-4 border-t border-gray-100">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        {/* Author Bio Box */}
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded space-y-2">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            About the Contributors
          </div>
          <h3 className="font-serif font-bold text-ink-950 text-base">
            {post.author}
          </h3>
          <p className="text-xs text-gray-600 font-sans leading-relaxed">
            The MedFlow AI research and engineering group designs open, voice-first digital infrastructure for rural dispensaries, community clinics, and public primary healthcare networks across India.
          </p>
        </div>

        {/* Read Next Section */}
        {otherPost && (
          <div className="pt-10 border-t border-gray-200 space-y-4">
            <SectionDivider label="Continue Reading" />
            <div className="p-6 bg-white border border-gray-300 rounded shadow-sm space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Next Article</span>
              <h4 className="font-serif font-bold text-ink-950 text-lg">
                {otherPost.title}
              </h4>
              <p className="text-xs text-gray-600 font-sans">
                {otherPost.excerpt}
              </p>
              <div className="pt-2">
                <Link to={`/resources/blog/${otherPost.slug}`}>
                  <Button variant="outline" size="sm">
                    Read This Next →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* 3. CLOSING CTA */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-serif font-bold text-ink-950">
            Experience the Paperless Flow in Real Time
          </h2>
          <p className="text-sm text-gray-600 font-sans">
            Test how our AI triage structuring works with live voice and text symptom inputs.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg">
                Launch Live Kiosk Demo
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" size="lg">
                Back to Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
