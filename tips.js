// Progress Bar
window.addEventListener('scroll', function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progressBar').style.width = scrollProgress + '%';
});

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from all buttons and content
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Show corresponding content
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Keyword Analyzer
document.getElementById('analyzeBtn').addEventListener('click', function() {
  const jobDescription = document.getElementById('jobDescription').value;
  if (!jobDescription.trim()) {
    alert('Please paste a job description first');
    return;
  }
  
  // Simple keyword extraction (in a real app, this would be more sophisticated)
  const keywords = extractKeywords(jobDescription);
  displayKeywords(keywords);
});

function extractKeywords(text) {
  // Common words to exclude
  const stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'of', 'as'];
  
  // Get words and count frequencies
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const wordCount = {};
  
  words.forEach(word => {
    if (word.length > 3 && !stopWords.includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and get top 20
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(entry => entry[0]);
}

function displayKeywords(keywords) {
  const container = document.getElementById('keywordsDisplay');
  container.innerHTML = '';
  
  if (keywords.length === 0) {
    container.innerHTML = '<p>No significant keywords found. Try a longer description.</p>';
    return;
  }
  
  keywords.forEach(keyword => {
    const span = document.createElement('span');
    span.textContent = keyword;
    container.appendChild(span);
  });
}

// Download Guide
document.getElementById('downloadPdf').addEventListener('click', function() {
  // Create a printable version of the content
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ResumeCraft Pro Guide</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #4361ee; text-align: center; margin-bottom: 1.5rem; }
        h2 { color: #3f37c9; border-bottom: 2px solid #4895ef; display: inline-block; margin: 1.5rem 0 1rem; }
        ul { margin-left: 20px; }
        li { margin-bottom: 8px; }
        .tip-box { background: #f0f9ff; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #4cc9f0; }
        .warning-box { background: #fef2f2; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #f72585; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
        .stat-box { background-color: rgba(67, 97, 238, 0.1); border-radius: 8px; padding: 1rem; text-align: center; }
        .stat-number { font-size: 1.5rem; font-weight: bold; color: #4361ee; }
        .stat-label { font-size: 0.8rem; color: #6c757d; }
      </style>
    </head>
    <body>
      <h1>ResumeCraft Pro Guide</h1>
      ${document.querySelector('main').innerHTML}
    </body>
    </html>
  `;

  // Create a Blob with the content
  const blob = new Blob([printContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ResumeCraft_Pro_Guide.html';
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Template Button
document.getElementById('templateBtn').addEventListener('click', function() {
  alert('Professional templates are coming soon! Check back later.');
});

// Print Checklist
document.querySelector('.print-checklist')?.addEventListener('click', function() {
  window.print();
});