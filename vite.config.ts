import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatic Lecture Indexer Function
function indexLectures() {
  const lecturesDir = path.resolve(__dirname, 'public/lectures');
  const publicDir = path.resolve(__dirname, 'public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Ensure public/lectures exists
  if (!fs.existsSync(lecturesDir)) {
    fs.mkdirSync(lecturesDir, { recursive: true });
  }

  // If there are no HTML files, write rich sample lectures
  const files = fs.readdirSync(lecturesDir);
  const htmlFiles = files.filter(f => f.endsWith('.html') && f !== 'index.html');

  if (htmlFiles.length === 0) {
    const samples = [
      {
        fileName: '01-foundations-of-prompting.html',
        title: 'Lecture 1: Foundations of Prompt Engineering',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lecture 1: Foundations of Prompt Engineering</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght=400;500;600;700&family=JetBrains+Mono:wght=400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        code { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="bg-[#faf9f6] text-slate-800 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-12">
        <header class="mb-8 pb-6 border-b border-rose-200">
            <span class="text-rose-500 font-semibold uppercase tracking-wider text-sm font-mono">Unit 1 &bull; Core Foundations</span>
            <h1 class="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Foundations of Prompt Engineering</h1>
            <p class="text-slate-500 mt-2">Instructor: Dr. Nitin Mishra &bull; Prompt Engineering & LLM Systems</p>
        </header>
        
        <article class="space-y-6 text-slate-700 leading-relaxed">
            <p class="text-lg text-slate-600 leading-relaxed">
                Welcome to the inaugural lecture of Dr. Nitin Mishra's Prompt Engineering course. In this unit, we explore the core mental models governing how Large Language Models (LLMs) parse user inputs and why structured prompts trigger significantly more stable answers.
            </p>

            <div class="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
                <h3 class="font-bold text-amber-950 text-lg">Core Truth: LLMs are Pattern Completion Engines</h3>
                <p class="text-amber-900 mt-1">
                    An LLM does not "think" or "know" in the human sense. It predicts the statistical continuation of a sequence. Prompt engineering is the methodology of organizing context, formatting, and directives to force the next-token distribution toward highly accurate outputs.
                </p>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">The 4 Key Pillars of an Engineered Prompt</h2>
            <p>Every professional prompt is composed of modular elements. By separating these blocks, we prevent instruction-drift:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Instruction:</strong> The primary directive or action (e.g., "Summarize", "Translate", "Classify").</li>
                <li><strong>Context:</strong> Background rules, personas, or corpus constraints.</li>
                <li><strong>Input Data:</strong> The raw content to operate on, clearly wrapped in semantic XML or Markdown delimiters.</li>
                <li><strong>Output Formatter:</strong> Structured layout schema (e.g., "Output as a JSON array matching the schema...").</li>
            </ul>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Case Study: Direct vs. Structured Layouts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl">
                    <span class="text-rose-700 font-bold text-xs uppercase tracking-wider font-mono">Naive Prompt ❌</span>
                    <p class="text-xs text-slate-700 mt-2 font-mono bg-white p-3 rounded-lg border border-rose-100">
                        Summarize this text: "The quick brown fox jumps over the lazy dog." Make it short.
                    </p>
                    <p class="text-xs text-rose-600 mt-2">Why: Ambiguous length, vague criteria, low control.</p>
                </div>
                <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <span class="text-emerald-700 font-bold text-xs uppercase tracking-wider font-mono">Engineered Prompt ✅</span>
                    <p class="text-xs text-slate-700 mt-2 font-mono bg-white p-3 rounded-lg border border-emerald-100">
                        [Role]: Concise Editor<br>
                        [Task]: Summarize the Input text.<br>
                        [Constraints]: Exactly 1 sentence. Under 15 words.<br>
                        [Input]: "The quick brown fox jumps over the lazy dog."
                    </p>
                    <p class="text-xs text-emerald-600 mt-2">Why: Explicit roles, constraints, and labeled blocks.</p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Further Readings</h2>
            <p>
                Please read the seminal papers: <em>"Language Models are Few-Shot Learners"</em> (Brown et al., 2020) and <em>"Pre-train, Prompt, and Predict"</em> (Liu et al., 2021) ahead of our next lab.
            </p>
        </article>

        <footer class="mt-12 pt-6 border-t border-slate-200 text-sm text-slate-400 flex justify-between">
            <span>&copy; 2026 Dr. Nitin Mishra</span>
            <span class="font-mono text-xs">Prompt Engineering CSE-402</span>
        </footer>
    </div>
</body>
</html>`
      },
      {
        fileName: '02-personas-and-roleplaying.html',
        title: 'Lecture 2: The Power of Personas & Role-Play',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lecture 2: The Power of Personas & Role-Play</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        code { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="bg-[#faf9f6] text-slate-800 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-12">
        <header class="mb-8 pb-6 border-b border-indigo-200">
            <span class="text-indigo-500 font-semibold uppercase tracking-wider text-sm font-mono">Unit 2 &bull; Role Modeling</span>
            <h1 class="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">The Power of Personas & Role-Play</h1>
            <p class="text-slate-500 mt-2">Instructor: Dr. Nitin Mishra &bull; Prompt Engineering & LLM Systems</p>
        </header>
        
        <article class="space-y-6 text-slate-700 leading-relaxed">
            <p class="text-lg text-slate-600 leading-relaxed">
                In this lecture, we examine why persona-assignment alters LLM outputs. By setting a professional context (e.g., "Act as a security auditor"), we restrict the vocabulary space to highly authoritative data distributions.
            </p>

            <div class="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-xl my-6">
                <h3 class="font-bold text-indigo-950 text-lg">Why Personas Work mathematically</h3>
                <p class="text-indigo-900 mt-1">
                    By priming the prompt with a specialized role, you shift the model's high-dimensional latent space focus toward medical, legal, or technical subsets of its training data. This drastically filters out colloquial or generic vocabulary.
                </p>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Standard Persona Blueprint</h2>
            <p>To construct an unshakeable persona, use this 4-step blueprint:</p>
            <ol class="list-decimal pl-6 space-y-2">
                <li><strong>Identity/Expertise:</strong> Define exact credentials (e.g., "Act as a Staff Software Engineer at Google with 15 years of React experience").</li>
                <li><strong>Target Audience:</strong> Define who they are addressing (e.g., "Explain things to an associate product manager with no coding background").</li>
                <li><strong>Tone & Stylistic Rules:</strong> Control conversational attributes (e.g., "Be objective, use concrete metaphors, avoid corporate platitudes").</li>
                <li><strong>Boundary Rules:</strong> List strictly forbidden behaviors (e.g., "If there is no direct evidence, explicitly state 'Insufficient Data'. Never speculate").</li>
            </ol>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Comparative Persona Outputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div class="bg-[#1e1e2e] text-indigo-300 p-5 rounded-xl font-mono text-xs">
                    <span class="text-pink-400 font-bold font-sans">Persona: 5-Year-Old Explanation 👶</span>
                    <p class="text-slate-200 mt-2">
                        "Quantum entanglement is like having two magical walkie-talkies. When you paint one pink, the other one immediately paints itself pink too, even if it is on the other side of the solar system!"
                    </p>
                </div>
                <div class="bg-[#1e1e2e] text-teal-300 p-5 rounded-xl font-mono text-xs">
                    <span class="text-teal-400 font-bold font-sans">Persona: PhD Advisor 🔬</span>
                    <p class="text-slate-200 mt-2">
                        "Quantum entanglement refers to physical systems prepared in an inseparable state, such that independent measurements on spatially separated subsystems demonstrate violations of Bell's inequalities."
                    </p>
                </div>
            </div>
        </article>

        <footer class="mt-12 pt-6 border-t border-slate-200 text-sm text-slate-400 flex justify-between">
            <span>&copy; 2026 Dr. Nitin Mishra</span>
            <span class="font-mono text-xs">Prompt Engineering CSE-402</span>
        </footer>
    </div>
</body>
</html>`
      },
      {
        fileName: '03-few-shot-prompting.html',
        title: 'Lecture 3: Few-Shot Prompting and Exemplars',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lecture 3: Few-Shot Prompting and Exemplars</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        code { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="bg-[#faf9f6] text-slate-800 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-12">
        <header class="mb-8 pb-6 border-b border-cyan-200">
            <span class="text-cyan-500 font-semibold uppercase tracking-wider text-sm font-mono">Unit 3 &bull; Few-Shot Learning</span>
            <h1 class="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Few-Shot Prompting and Exemplars</h1>
            <p class="text-slate-500 mt-2">Instructor: Dr. Nitin Mishra &bull; Prompt Engineering & LLM Systems</p>
        </header>
        
        <article class="space-y-6 text-slate-700 leading-relaxed">
            <p class="text-lg text-slate-600 leading-relaxed">
                Few-shot prompting is the technique of feeding explicit demonstration pairs (input &rarr; output) into the context. This allows LLMs to learn niche formats, syntaxes, or classification logic in-context without parameter fine-tuning.
            </p>

            <div class="bg-cyan-50 border-l-4 border-cyan-500 p-5 rounded-r-xl my-6">
                <h3 class="font-bold text-cyan-950 text-lg">In-Context Learning (ICL)</h3>
                <p class="text-cyan-900 mt-1">
                    During few-shot prompting, the model's weights remain fixed. However, the internal attention mechanisms shift activation patterns, allowing the model to adapt to new tasks instantly inside the context window.
                </p>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Few-Shot Template Example</h2>
            <div class="bg-[#0f141c] text-slate-200 p-5 rounded-xl font-mono text-xs leading-relaxed border border-slate-800">
                <span class="text-cyan-400 font-semibold"># Task: Extract features and sentiment</span><br>
                <br>
                <span class="text-slate-500"># Exemplar 1</span><br>
                Input: "The battery lasts only 2 hours, but screen is gorgeous!"<br>
                Output: {"sentiment": "Mixed", "battery": "Bad", "display": "Good"}<br>
                <br>
                <span class="text-slate-500"># Exemplar 2</span><br>
                Input: "Support was extremely unhelpful. Refund took 3 weeks."<br>
                Output: {"sentiment": "Negative", "service": "Bad", "refund": "Slow"}<br>
                <br>
                <span class="text-slate-500"># Target Query</span><br>
                Input: "Incredible camera quality, but the app crashed once."<br>
                Output: [The LLM completes this sequence following the pattern]
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Top Few-Shot Guidelines</h2>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Label Balance:</strong> If you are classifying positive vs negative sentiment, include equal numbers of positive and negative exemplars. Otherwise, the model's prediction will bias towards the majority label.</li>
                <li><strong>Strict Syntactic Matching:</strong> Make sure brackets, spacing, and quotes match perfectly.</li>
                <li><strong>Delimiter Utility:</strong> Use clear separators like <code>---</code> or <code>===[Exemplar]===</code> to keep components distinct.</li>
            </ul>
        </article>

        <footer class="mt-12 pt-6 border-t border-slate-200 text-sm text-slate-400 flex justify-between">
            <span>&copy; 2026 Dr. Nitin Mishra</span>
            <span class="font-mono text-xs">Prompt Engineering CSE-402</span>
        </footer>
    </div>
</body>
</html>`
      },
      {
        fileName: '04-chain-of-thought.html',
        title: 'Lecture 4: Logical Reasoning & Chain of Thought',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lecture 4: Logical Reasoning & Chain of Thought</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        code { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="bg-[#faf9f6] text-slate-800 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-12">
        <header class="mb-8 pb-6 border-b border-emerald-200">
            <span class="text-emerald-500 font-semibold uppercase tracking-wider text-sm font-mono">Unit 4 &bull; Cognitive Reasoning</span>
            <h1 class="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Logical Reasoning & Chain of Thought</h1>
            <p class="text-slate-500 mt-2">Instructor: Dr. Nitin Mishra &bull; Prompt Engineering & LLM Systems</p>
        </header>
        
        <article class="space-y-6 text-slate-700 leading-relaxed">
            <p class="text-lg text-slate-600 leading-relaxed">
                Standard LLMs frequently fail at multi-step arithmetic, logic, or algorithmic queries. Chain-of-Thought (CoT) prompting instructs the model to explicitly lay out its intermediate reasoning steps before arriving at a final verdict, mimicking human cognitive drafting.
            </p>

            <div class="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl my-6">
                <h3 class="font-bold text-emerald-950 text-lg">Why "Think Step-by-Step" Solves Logic Bugs</h3>
                <p class="text-emerald-900 mt-1">
                    Without CoT, the model must map the input directly to the output in a single forward pass. Because tokens are generated auto-regressively, allowing the model to produce its reasoning sequence expands its computing steps and provides an explicit chain of dependencies for the final token prediction.
                </p>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">The Contrast Study</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div class="bg-red-50 border border-red-100 p-5 rounded-xl">
                    <span class="text-red-700 font-bold text-xs uppercase tracking-wider font-mono">Standard Prompt ❌</span>
                    <p class="text-sm font-mono text-slate-700 mt-2 bg-white p-3 rounded-lg">
                        Q: A cafeteria has 23 apples. If they use 20 to make lunch and buy 6 more, how many apples do they have?<br>
                        A: They have 3 apples. (Wrong arithmetic)
                    </p>
                </div>
                <div class="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                    <span class="text-emerald-700 font-bold text-xs uppercase tracking-wider font-mono">Chain of Thought (CoT) Prompt ✅</span>
                    <p class="text-sm font-mono text-slate-700 mt-2 bg-white p-3 rounded-lg">
                        Q: A cafeteria has 23 apples. If they use 20 to make lunch and buy 6 more, how many apples do they have? Let's think step by step.<br>
                        A: 1. The cafeteria starts with 23 apples.<br>
                        2. They use 20 apples for lunch, which leaves them with 23 - 20 = 3 apples.<br>
                        3. They purchase 6 more apples, which results in 3 + 6 = 9 apples.<br>
                        Therefore, they have 9 apples.
                    </p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 tracking-tight">Self-Consistency & Tree of Thoughts</h2>
            <p>
                For ultra-complex logic, prompt engineers use <strong>Self-Consistency</strong>: generating multiple distinct Chain-of-Thought pathways and selecting the most frequent final answer (voting). In more advanced layouts like <strong>Tree of Thoughts (ToT)</strong>, models evaluate individual steps dynamically, back-tracking when errors are caught.
            </p>
        </article>

        <footer class="mt-12 pt-6 border-t border-slate-200 text-sm text-slate-400 flex justify-between">
            <span>&copy; 2026 Dr. Nitin Mishra</span>
            <span class="font-mono text-xs">Prompt Engineering CSE-402</span>
        </footer>
    </div>
</body>
</html>`
      }
    ];

    for (const s of samples) {
      const filePath = path.join(lecturesDir, s.fileName);
      fs.writeFileSync(filePath, s.content, 'utf-8');
    }
  }

  // Now, re-read and build the JSON index
  const activeFiles = fs.readdirSync(lecturesDir).filter(f => f.endsWith('.html') && f !== 'index.html');
  const index = activeFiles.map(file => {
    const filePath = path.join(lecturesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.html', '').replace(/-/g, ' ');

    return {
      path: `/lectures/${file}`,
      title,
      fileName: file
    };
  });

  // Save index.json inside public/lectures/index.json
  fs.writeFileSync(path.join(lecturesDir, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');
  console.log(`Indexed ${index.length} lectures successfully into public/lectures/index.json!`);
}

// Vite plugin representation
function lectureIndexerPlugin() {
  return {
    name: 'lecture-indexer',
    buildStart() {
      try {
        indexLectures();
      } catch (err) {
        console.error('Failed to index lectures:', err);
      }
    },
    configureServer(server) {
      try {
        indexLectures();
      } catch (err) {
        console.error('Failed to index lectures:', err);
      }
      // Watch lectures directory for changes
      const lecturesDir = path.resolve(__dirname, 'public/lectures');
      server.watcher.add(`${lecturesDir}/*.html`);
      server.watcher.on('all', (event, file) => {
        if (file.endsWith('.html') && file.includes('public/lectures')) {
          console.log(`Lecture file updated (${event}): re-indexing...`);
          try {
            indexLectures();
          } catch (err) {
            console.error('Failed to index lectures on file change:', err);
          }
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), lectureIndexerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
