export async function POST(req: Request) {
  const { code, task } = await req.json();
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // A simple heuristic to check if the user is trying
  const isCorrect = code.length > 10 && (code.includes('function') || code.includes('=>'));

  const responses = [
    "APPROVED: Your code is as sharp as the mountain air. Deploying to the valley nodes.",
    "REJECTED: The logic is cloudier than a monsoon afternoon. Simplify your loops.",
    "APPROVED: Excellent. The local farmers will benefit from this optimization."
  ];

  const feedback = isCorrect ? responses[0] : responses[1];

  return Response.json({
    feedback,
    success: isCorrect,
    reward: isCorrect ? 500 : 0
  });
}






// import { google } from '@ai-sdk/google';
// import { generateText } from 'ai';

// export async function POST(req: Request) {
//   try {
//     const { code, task } = await req.json();
    
//     // Safety check for the key
//     if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
//       return Response.json({ feedback: "Chakaluwa error: API Key is missing from .env.local", success: false }, { status: 500 });
//     }

//     const { text } = await generateText({
//       // In the latest SDK, 'gemini-1.5-flash' is the standard string
//       model: google('gemini-2.0-flash-lite'), 
//       system: `You are a Senior Project Manager. 
//                Respond with 'APPROVED' if the code is correct, or 'REJECTED' with feedback if not. 
//                Keep the mountain/farm vibe in your feedback.`,
//       prompt: `Task: ${task}\nCode: ${code}`,
//     });

//     // We use a more flexible check in case the AI adds punctuation
//     const isApproved = text.toUpperCase().includes('APPROVED');

//     return Response.json({ 
//       feedback: text, 
//       success: isApproved, 
//       reward: isApproved ? 1000 : 0 
//     });

//   } catch (error: any) {
//     console.error("DEBUG LOG:", error);
//     return Response.json({ 
//       feedback: `The mountain satellite failed: ${error.message}`, 
//       success: false 
//     }, { status: 500 });
//   }
// }