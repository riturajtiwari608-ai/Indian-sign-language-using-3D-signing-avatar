from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from nlp import process_text
from gloss import to_gloss
from sigml import resolve_signs, list_valid_sign_words

app = FastAPI(title="ISL Translator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslateRequest(BaseModel):
    text: str


class TranslateResponse(BaseModel):
    gloss: list[str]
    signs: list[str]


@app.post("/translate", response_model=TranslateResponse)
async def translate(req: TranslateRequest):
    tokens = process_text(req.text)
    gloss = to_gloss(tokens)
    signs = resolve_signs(gloss)
    return TranslateResponse(gloss=gloss, signs=signs)


@app.get("/sign-words")
async def sign_words():
    """All gloss tokens that have a matching SignFiles/*.sigml animation."""
    return {"words": list_valid_sign_words()}


@app.get("/health")
async def health():
    return {"status": "ok"}



