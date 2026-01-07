import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  // For now, let's simulate the AI Manager checking your code
  // Later, we will connect this to a real AI model
  const isGoodCode = code.length > 10; 

  if (isGoodCode) {
    return NextResponse.json({ 
      message: "Great work! The client is happy. Credits transferred to your Chakaluwa account.",
      reward: 500 
    });
  } else {
    return NextResponse.json({ 
      message: "The code looks a bit thin. Try adding more logic to earn your fee.",
      reward: 0 
    });
  }
}