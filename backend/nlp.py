import spacy

nlp = spacy.load("en_core_web_sm")

STOP_WORDS = {
    "is", "am", "are", "was", "were", "be", "been", "being",
    "the", "a", "an", "do", "does", "did", "has", "have", "had",
    "will", "shall", "would", "could", "should", "may", "might",
    "can", "to", "of", "for", "with", "at", "by", "from", "up",
    "about", "into", "through", "during", "before", "after",
    "above", "below", "between", "out", "on", "off", "over",
    "under", "again", "further", "then", "once", "just", "very",
    "not", "no", "nor", "so", "too", "also", "than", "that",
    "this", "these", "those",
}


def process_text(text: str) -> list[dict]:
    doc = nlp(text)
    tokens = []
    for token in doc:
        if token.is_punct or token.is_space:
            continue
        if token.text.lower() in STOP_WORDS:
            continue
        lemma = token.lemma_
        if lemma == "-PRON-":
            lemma = token.text
        tokens.append({
            "text": token.text,
            "lemma": lemma.upper(),
            "pos": token.pos_,
        })
    return tokens
