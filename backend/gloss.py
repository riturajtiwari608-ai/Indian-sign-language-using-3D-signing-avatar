PRONOUN_MAP = {
    "I": "me",
    "ME": "me",
    "MY": "my",
    "MINE": "my",
    "MYSELF": "me",
    "YOU": "you",
    "YOUR": "your",
    "YOURS": "yours",
    "YOURSELF": "yourself",
    "HE": "he",
    "HIM": "him",
    "HIS": "his",
    "HIMSELF": "himself",
    "SHE": "her",
    "HER": "her",
    "HERS": "hers",
    "WE": "we",
    "US": "us",
    "OUR": "our",
    "THEY": "they",
    "THEM": "them",
    "THEIR": "their",
    "THEMSELVES": "themselves",
    "IT": "this",
    "ITS": "this",
}

EXTRA_SKIP = {"DO", "DOES", "DID", "VERY", "JUST", "ALSO", "SO", "THEN"}

COMPOUND_LEMMA = {
    "THANK": "thankyou",
}


def to_gloss(tokens: list[dict]) -> list[str]:
    result = []
    skip_next = False

    for i, tok in enumerate(tokens):
        if skip_next:
            skip_next = False
            continue

        word = tok["lemma"]

        if word in EXTRA_SKIP:
            continue

        if word in COMPOUND_LEMMA:
            result.append(COMPOUND_LEMMA[word])
            if i + 1 < len(tokens) and tokens[i + 1]["lemma"].upper() == "YOU":
                skip_next = True
            continue

        if word in PRONOUN_MAP:
            result.append(PRONOUN_MAP[word])
            continue

        if tok["text"].upper() in PRONOUN_MAP:
            result.append(PRONOUN_MAP[tok["text"].upper()])
            continue

        result.append(word.lower())

    return result
