import os
import sys
import json
import random
from pathlib import Path
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import urllib.error

# Load environment variables from .env if present
def load_dotenv():
    env_path = Path(__file__).resolve().parent / ".env"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    k = k.strip()
                    v = v.strip().strip("'\"")
                    if k and k not in os.environ:
                        os.environ[k] = v

load_dotenv()

PORT = int(os.environ.get("PORT", 8000))
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
TARGET_EMAIL = os.environ.get("TARGET_EMAIL", "jinynme@gmail.com")

INQUIRY_TYPES = {
    "book-recommend": "그림책 맞춤 추천",
    "recipe-submit": "독후활동 제보",
    "partnership": "제휴 및 협업",
    "general": "일반/기타 문의"
}

CHILD_AGES = {
    "0-12m": "0 ~ 12개월 (감각탐색기)",
    "12-24m": "12 ~ 24개월 (말놀이·어휘폭발기)",
    "3-4y": "3 ~ 4세 (감정인지·상상놀이기)",
    "5-7y": "5 ~ 7세 (창의표현·스토리텔링기)"
}

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/inquiry":
            self.handle_inquiry()
        else:
            self.send_error(404, "Endpoint Not Found")

    def handle_inquiry(self):
        if not RESEND_API_KEY:
            self.send_json_response({
                "success": False,
                "error": "RESEND_API_KEY가 설정되지 않았습니다. .env 파일을 확인해 주세요."
            }, 500)
            return

        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            self.send_json_response({"success": False, "error": "빈 요청 데이터입니다."}, 400)
            return

        body = self.rfile.read(content_length)
        try:
            data = json.loads(body.decode("utf-8"))
        except Exception as e:
            self.send_json_response({"success": False, "error": f"JSON 파싱 오류: {str(e)}"}, 400)
            return

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        phone = data.get("phone", "").strip() or "미입력"
        child_age_key = data.get("childAge", "")
        child_age = CHILD_AGES.get(child_age_key, "선택 안 함 (해당 없음)")
        inquiry_type_key = data.get("type", "general")
        inquiry_type = INQUIRY_TYPES.get(inquiry_type_key, "일반/기타 문의")
        title = data.get("title", "").strip()
        message = data.get("message", "").strip()
        attachment = data.get("attachment")

        if not name or not email or not title or not message:
            self.send_json_response({"success": False, "error": "필수 입력 항목(성함, 이메일, 제목, 상세내용)이 누락되었습니다."}, 400)
            return

        ticket_num = f"Q-{datetime.now().year}-{random.randint(1000, 9999)}"
        created_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # HTML Email Template
        html_body = f"""
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4A6B53 0%, #314937 100%); padding: 28px 24px; color: #ffffff; text-align: center;">
            <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">🌿 북싹북싹 놀터 1:1 고객 문의</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">신규 문의 접수 번호: <strong>{ticket_num}</strong></p>
          </div>

          <!-- Content Body -->
          <div style="padding: 28px 24px;">
            <div style="background-color: #F8F9FA; border-left: 4px solid #4A6B53; padding: 14px 16px; border-radius: 4px; margin-bottom: 24px;">
              <span style="display: inline-block; background-color: #E8F0EA; color: #2D5237; font-weight: 600; font-size: 12px; padding: 3px 8px; border-radius: 20px; margin-bottom: 6px;">{inquiry_type}</span>
              <h2 style="margin: 4px 0 0 0; font-size: 18px; color: #1f2937; line-height: 1.4;">{title}</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 8px; font-weight: 600; color: #64748b; width: 110px;">작성자</td>
                  <td style="padding: 10px 8px; color: #1e293b; font-weight: 500;">{name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 8px; font-weight: 600; color: #64748b;">회신 이메일</td>
                  <td style="padding: 10px 8px; color: #1e293b;"><a href="mailto:{email}" style="color: #4A6B53; text-decoration: underline;">{email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 8px; font-weight: 600; color: #64748b;">연락처</td>
                  <td style="padding: 10px 8px; color: #1e293b;">{phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 8px; font-weight: 600; color: #64748b;">아이 연령대</td>
                  <td style="padding: 10px 8px; color: #1e293b;">{child_age}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 8px; font-weight: 600; color: #64748b;">접수 시각</td>
                  <td style="padding: 10px 8px; color: #1e293b;">{created_time}</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 15px; color: #334155; margin-bottom: 10px; font-weight: 600;">문의 상세 내용</h3>
              <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 18px; color: #292524; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">{message}</div>
            </div>

            <!-- Reply Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:{email}?subject=[답변] {title}" style="display: inline-block; background-color: #4A6B53; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px;">고객에게 바로 답장하기</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
            이 메일은 북싹북싹 놀터 웹사이트의 1:1 온라인 문의하기 폼을 통해 Resend API로 발송되었습니다.
          </div>
        </div>
        """

        email_payload = {
            "from": "북싹북싹 놀터 <onboarding@resend.dev>",
            "to": [TARGET_EMAIL],
            "reply_to": email,
            "subject": f"[북싹북싹 놀터 문의] {inquiry_type}: {title}",
            "html": html_body
        }

        if attachment and isinstance(attachment, dict):
            filename = attachment.get("filename")
            content = attachment.get("content")
            if filename and content:
                email_payload["attachments"] = [
                    {
                        "filename": filename,
                        "content": content
                    }
                ]

        req = urllib.request.Request(
            "https://api.resend.com/emails",
            data=json.dumps(email_payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        )

        try:
            with urllib.request.urlopen(req) as resp:
                res_data = json.loads(resp.read().decode("utf-8"))
                self.send_json_response({
                    "success": True,
                    "ticket": ticket_num,
                    "id": res_data.get("id"),
                    "message": "문의가 성공적으로 전송되었습니다."
                }, 200)
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8") if hasattr(e, "read") else str(e)
            print(f"[Resend API Error {e.code}]: {err_body}", file=sys.stderr)
            self.send_json_response({
                "success": False,
                "error": f"이메일 발송 중 오류가 발생했습니다: {err_body}"
            }, e.code)
        except Exception as e:
            print(f"[Server Error]: {str(e)}", file=sys.stderr)
            self.send_json_response({
                "success": False,
                "error": f"서버 내부 오류: {str(e)}"
            }, 500)

    def send_json_response(self, data, status_code=200):
        response_bytes = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

def run():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, CustomHandler)
    print(f"==================================================")
    print(f"🌿 북싹북싹 놀터 로컬 웹 서버 시작")
    print(f"🔗 접속 주소: http://localhost:{PORT}")
    print(f"📧 문의 수신: {TARGET_EMAIL} (Resend API 연동됨)")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버를 종료합니다.")
        httpd.server_close()

if __name__ == "__main__":
    run()
