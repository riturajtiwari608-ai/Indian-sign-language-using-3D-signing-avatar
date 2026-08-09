import logging
from pathlib import Path

logger = logging.getLogger(__name__)

WORDS_PATH = Path(__file__).parent / "data" / "valid_words.txt"

VALID_WORDS: set[str] = set()
with open(WORDS_PATH, encoding="utf-8") as f:
    for line in f:
        w = line.strip()
        if w:
            VALID_WORDS.add(w.lower())

LETTERS = set("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

WORD_ALIASES: dict[str, str] = {
    "help": "help-me",
    "drink": "drinking",
    "thankyou": "thankyou",
    "thank": "thankyou",
    "thanks": "thankyou",
    "school": "class",
    "classroom": "classroom",
    "happy": "enjoy",
    "play": "cricket",
    "give": "give-me",
    "child": "child",
    "children": "children",
    "mother": "mother",
    "father": "father",
    "name": "name",
    "evening": "evening",
    "night": "night",
    "today": "today",
    "tomorrow": "tomorrow",
    "yesterday": "yesterday",
    "home": "home",
    "book": "book",
    "write": "write",
    "read": "read",
    "learn": "learn",
    "teach": "teach",
    "teacher": "teacher",
    "doctor": "doctor",
    "hospital": "clinic",
    "money": "money",
    "work": "work",
    "telephone": "phone",
    "phone": "phone",
    "time": "time",
    "stop": "calm-down",
    "wait": "wait",
    "understand": "understand",
    "know": "know",
    "think": "think",
    "feel": "feel",
    "see": "see",
    "meet": "meet",
    "talk": "talk",
    "say": "say",
    "ask": "askquestion",
    "answer": "answer",
    "call": "call",
    "run": "run",
    "walk": "walkacross",
    "sit": "sitandmeet",
    "open": "open",
    "close": "close",
    "big": "big",
    "small": "little-fingerhand",
    "new": "new",
    "old": "old",
    "man": "man",
    "woman": "woman",
    "boy": "boy",
    "girl": "girl",
    "person": "person",
}


def resolve_signs(gloss_tokens: list[str]) -> list[str]:
    """Convert gloss tokens into a list of sign-file names.
    If a word has a matching .sigml file, use it directly.
    If an alias exists, use the alias.
    Otherwise, fingerspell it letter by letter.
    """
    signs = []
    for token in gloss_tokens:
        word = token.lower()

        if word in VALID_WORDS:
            signs.append(word)
        elif word in WORD_ALIASES and WORD_ALIASES[word].lower() in VALID_WORDS:
            signs.append(WORD_ALIASES[word].lower())
        else:
            logger.warning("No SiGML file for '%s' — fingerspelling", token)
            for ch in token.upper():
                if ch in LETTERS:
                    signs.append(ch)
    return signs


def list_valid_sign_words() -> list[str]:
    return sorted(VALID_WORDS)
