from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pypdf import PdfReader
import io

from analyzer import analyze_resume

app = FastAPI()

app = FastAPI(
    title="SkillGap AI API",
    description="Backend API for Skill Gap Analyzer",
    version="1.0.0"
)


# Allow Next.js frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "SkillGap AI Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # Check file type
    if file.content_type != "application/pdf":
        return {
            "success": False,
            "message": "Please upload a PDF file."
        }

    # Read PDF
    contents = await file.read()

    try:
        pdf = PdfReader(io.BytesIO(contents))

        text = ""

        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return {
    "success": True,
    "filename": file.filename,
    "pages": len(pdf.pages),
    "text_length": len(text),
    "text": text,
    "message": "Resume uploaded and text extracted successfully."
}
    except Exception as e:

        return {
            "success": False,
            "message": f"Could not read PDF: {str(e)}"
        }


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    target_role: str = "AI Engineer"
):

    if file.content_type != "application/pdf":
        return {
            "success": False,
            "message": "Please upload a PDF file."
        }

    contents = await file.read()

    try:

        pdf = PdfReader(
            io.BytesIO(contents)
        )

        text = ""

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        result = analyze_resume(
            text,
            target_role
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }    

class AnalysisRequest(BaseModel):
    resume_text: str
    target_role: str


@app.post("/analyze-text")
async def analyze_text(request: AnalysisRequest):

    try:
        result = analyze_resume(
            request.resume_text,
            request.target_role
        )

        return result

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }    