import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const keystrokeData = await request.json();

    // For MVP, we'll log to console and store in memory
    // In production, this would connect to Supabase
    console.log('Keystroke logged:', {
      timestamp: keystrokeData.timestamp,
      promptedCharacter: keystrokeData.promptedCharacter,
      typedCharacter: keystrokeData.typedCharacter,
      correct: keystrokeData.correct,
      latency: keystrokeData.latency,
      level: keystrokeData.level,
      sessionId: keystrokeData.sessionId || 'anonymous'
    });

    // TODO: In production, save to Supabase:
    // const { data, error } = await supabase
    //   .from('keystroke_logs')
    //   .insert([keystrokeData]);

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error('Error logging keystroke:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log keystroke' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Keystroke logging endpoint active',
    timestamp: new Date().toISOString()
  });
}