const systemPrompt = `分析用户上传的图片，只返回 JSON。字段必须是 subject、composition、lighting、color、style、prompt、negativePrompt，且所有值都是字符串。prompt 使用英文，其他分析字段使用中文。不要猜测无法从图片确认的人物身份、品牌或地点。`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: 'MODEL_NOT_CONFIGURED' }, { status: 503 });

  try {
    const body = await request.json() as { image?: string };
    if (!body.image?.startsWith('data:image/')) return Response.json({ error: 'INVALID_IMAGE' }, { status: 400 });
    if (body.image.length > 11_000_000) return Response.json({ error: 'IMAGE_TOO_LARGE' }, { status: 413 });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_VISION_MODEL || 'gpt-4.1-mini',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: [{ type: 'text', text: '请按约定结构分析这张图。' }, { type: 'image_url', image_url: { url: body.image, detail: 'low' } }] },
        ],
      }),
    });
    if (!response.ok) return Response.json({ error: 'MODEL_REQUEST_FAILED' }, { status: 502 });
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return Response.json({ error: 'EMPTY_MODEL_RESPONSE' }, { status: 502 });
    return Response.json({ result: JSON.parse(content) });
  } catch {
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
}
