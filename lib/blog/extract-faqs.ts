/**
 * Extract FAQ schema from article HTML content
 * Looks for FAQ sections with <h3> questions and <p> answers
 */
export function extractFAQSchema(html: string): object | null {
  if (!html) return null;

  // Match FAQ section (after "Frequently Asked Questions" or "FAQ")
  const faqMatch = html.match(
    /<h2>Frequently Asked Questions<\/h2>([\s\S]*?)(?=<h2>|<\/article>|$)/i
  ) || html.match(
    /<h2>FAQ<\/h2>([\s\S]*?)(?=<h2>|<\/article>|$)/i
  );

  if (!faqMatch) return null;

  const faqSection = faqMatch[1];
  if (!faqSection) return null;

  // Extract Q&A pairs (h3 = question, p = answer)
  const questionPattern = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
  const questions: Array<{ question: string; answer: string }> = [];
  
  let match;
  while ((match = questionPattern.exec(faqSection)) !== null) {
    if (!match[1] || !match[2]) continue;
    
    const question = match[1].replace(/<[^>]*>/g, '').trim();
    const answer = match[2].replace(/<[^>]*>/g, '').trim();
    
    if (question && answer) {
      questions.push({ question, answer });
    }
  }

  if (questions.length === 0) return null;

  // Generate FAQ schema
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer
      }
    }))
  };
}
