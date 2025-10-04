from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
import re


app = FastAPI(title="IdeaVault AI")


class In(BaseModel):
    text: str


class Out(BaseModel):
    summary: str
    tags: list[str]


# Simple TF‑IDF keyphrase extractor over the given text
_vectorizer = TfidfVectorizer(ngram_range=(1,2), stop_words='english')


@app.post('/summarize', response_model=Out)
def summarize(payload: In):
    text = payload.text.strip()
    if not text:
        return Out(summary="", tags=[])


    # crude sentence split
    sents = re.split(r'[.!?]\s+', text)
    first = (sents[0] if sents else text)[:180]


    # TF‑IDF keywords
    tokens = [text]
    X = _vectorizer.fit_transform(tokens)
    vocab = _vectorizer.get_feature_names_out()
    scores = X.toarray()[0]
    pairs = sorted(zip(vocab, scores), key=lambda x: x[1], reverse=True)
    tags = [w for (w, _) in pairs[:3]]


    summary = first if len(first) > 0 else text[:160]
    return Out(summary=summary, tags=tags)