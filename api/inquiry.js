// api/inquiry.js - Vercel / Netlify Serverless Function
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TARGET_EMAIL = process.env.TARGET_EMAIL || 'jinynme@gmail.com';

  if (!RESEND_API_KEY) {
    return res.status(500).json({ success: false, error: 'RESEND_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  const INQUIRY_TYPES = {
    'book-recommend': '그림책 맞춤 추천',
    'recipe-submit': '독후활동 제보',
    'partnership': '제휴 및 협업',
    'general': '일반/기타 문의'
  };

  const CHILD_AGES = {
    '0-12m': '0 ~ 12개월 (감각탐색기)',
    '12-24m': '12 ~ 24개월 (말놀이·어휘폭발기)',
    '3-4y': '3 ~ 4세 (감정인지·상상놀이기)',
    '5-7y': '5 ~ 7세 (창의표현·스토리텔링기)'
  };

  try {
    const { name, email, phone, childAge, type, title, message, attachment } = req.body || {};

    if (!name || !email || !title || !message) {
      return res.status(400).json({ success: false, error: '필수 입력 항목이 누락되었습니다.' });
    }

    const inquiryType = INQUIRY_TYPES[type] || '일반/기타 문의';
    const childAgeText = CHILD_AGES[childAge] || '선택 안 함 (해당 없음)';
    const ticketNum = `Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #4A6B53 0%, #314937 100%); padding: 28px 24px; color: #ffffff; text-align: center;">
          <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">🌿 북싹북싹 놀터 1:1 고객 문의</h1>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">신규 문의 접수 번호: <strong>${ticketNum}</strong></p>
        </div>
        <div style="padding: 28px 24px;">
          <div style="background-color: #F8F9FA; border-left: 4px solid #4A6B53; padding: 14px 16px; border-radius: 4px; margin-bottom: 24px;">
            <span style="display: inline-block; background-color: #E8F0EA; color: #2D5237; font-weight: 600; font-size: 12px; padding: 3px 8px; border-radius: 20px; margin-bottom: 6px;">${inquiryType}</span>
            <h2 style="margin: 4px 0 0 0; font-size: 18px; color: #1f2937;">${title}</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 8px; font-weight: 600; color: #64748b; width: 110px;">작성자</td><td style="padding: 10px 8px; color: #1e293b; font-weight: 500;">${name}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 8px; font-weight: 600; color: #64748b;">회신 이메일</td><td style="padding: 10px 8px; color: #1e293b;"><a href="mailto:${email}" style="color: #4A6B53;">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 8px; font-weight: 600; color: #64748b;">연락처</td><td style="padding: 10px 8px; color: #1e293b;">${phone || '미입력'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 8px; font-weight: 600; color: #64748b;">아이 연령대</td><td style="padding: 10px 8px; color: #1e293b;">${childAgeText}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 8px; font-weight: 600; color: #64748b;">접수 시각</td><td style="padding: 10px 8px; color: #1e293b;">${createdTime}</td></tr>
            </tbody>
          </table>
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 15px; color: #334155; margin-bottom: 10px; font-weight: 600;">문의 상세 내용</h3>
            <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 18px; color: #292524; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=[답변] ${encodeURIComponent(title)}" style="display: inline-block; background-color: #4A6B53; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px;">고객에게 바로 답장하기</a>
          </div>
        </div>
      </div>
    `;

    const payload = {
      from: '북싹북싹 놀터 <onboarding@resend.dev>',
      to: [TARGET_EMAIL],
      reply_to: email,
      subject: `[북싹북싹 놀터 문의] ${inquiryType}: ${title}`,
      html: htmlBody
    };

    if (attachment && attachment.filename && attachment.content) {
      payload.attachments = [{
        filename: attachment.filename,
        content: attachment.content
      }];
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data.message || 'Resend API 오류' });
    }

    return res.status(200).json({ success: true, ticket: ticketNum, id: data.id });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || '서버 오류' });
  }
}
