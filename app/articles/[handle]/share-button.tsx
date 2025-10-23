'use client';

export default function ShareButton({ title, handle }: { title: string; handle: string }) {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator
          .share({
            title: title,
            url: `/articles/${handle}`
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(`https://kittaly.com/articles/${handle}`);
        alert('Link copied to clipboard!');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-neutral-600 transition-colors hover:text-black"
      aria-label="Copy link"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </button>
  );
}
