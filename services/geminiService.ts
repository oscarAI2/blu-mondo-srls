
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

// Initialization strictly follows the world-class guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const V0_SYSTEM_PROMPT = `
You are the V0 Neural Compiler v4.5 (Optimer Edition). 
Your task is to synthesize industrial-grade React components using Tailwind CSS and shadcn/ui principles.

[STYLE GUIDELINES]
- Layout: Always use a 24-column grid (grid-cols-24).
- Aesthetics: rounded-[3rem], bold italic uppercase headers, high tracking.
- Colors: Teal (#14b8a6), Slate-950, Emerald-500, Indigo-500.
- Quality: Production-ready, accessible, mobile-responsive.

[CODE CONVENTIONS]
- Return ONLY the raw HTML/Tailwind code string.
- Use 'class=' (NOT className) for raw HTML snippets.
- Use Tailwind for everything. No external CSS.
`;

export const compilerTools: FunctionDeclaration[] = [
  {
    name: 'add_section',
    parameters: {
      type: Type.OBJECT,
      description: 'Synthesize a new industrial module node.',
      properties: {
        category: { type: Type.STRING, description: 'Hero, Bento, CTA, Dashboard, Git, Drive, etc.' },
        description: { type: Type.STRING, description: 'Visual intent and functionality of the node.' },
        style: { type: Type.STRING, enum: ['industrial-ultra', 'magic-ui', 'minimal-shadcn', 'cloud-ops'] }
      },
      required: ['category', 'description', 'style'],
    },
  }
];

/**
 * Phase 1: Planning with Gemini 3 Pro
 * Uses reasoning to map out the application structure.
 */
export const planArchitecture = async (prompt: string, context?: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `SYSTEM: ${V0_SYSTEM_PROMPT}\nUSER_REQUEST: ${prompt}\nCURRENT_CANVAS_CONTEXT: ${context || 'Empty Project'}`,
    config: {
      tools: [{ functionDeclarations: compilerTools }],
      thinkingConfig: { thinkingBudget: 16000 }
    },
  });
  return response.functionCalls;
};

/**
 * Phase 2: Materialization with Gemini 3 Flash
 * Rapidly generates the actual code for each planned node.
 */
export const materializer = async (category: string, description: string, style: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${V0_SYSTEM_PROMPT}\nMATERIALIZE_NODE: ${category}\nINTENT: ${description}\nSTYLE: ${style}\n\nOutput valid HTML with Tailwind classes only.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'A short uppercase name for the node (e.g. HERO_ALPHA).' },
          code: { type: Type.STRING, description: 'The complete HTML/Tailwind code string.' },
          description: { type: Type.STRING, description: 'A brief 1-sentence industrial description.' }
        },
        required: ["name", "code", "description"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse materializer output:", e);
    return { name: 'CORRUPT_NODE', code: '<div class="p-10 bg-red-500 text-white font-black">GENERATION_ERROR</div>', description: 'Failed to generate node.' };
  }
};
