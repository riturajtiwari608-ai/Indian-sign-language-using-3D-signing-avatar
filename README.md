# Indian Sign Language (ISL) Translator

Text-to-ISL animation system that converts English sentences into Indian Sign Language using a real **3D signing avatar** powered by the CWA (CWASA) Signing Avatar system from the University of East Anglia.

## How It Works

1. **Enter** an English sentence (e.g. "I am eating food")
2. **NLP pipeline** (spaCy) processes the text: removes stop words, lemmatizes, maps pronouns
3. **Gloss generation** converts tokens to ISL gloss
4. **Sign resolution** maps each gloss word to a real `.sigml` file (850+ signs available) — unknown words are fingerspelled letter by letter
5. **3D Avatar** plays each sign using the CWA WebGL signing avatar with HamNoSys SiGML notation

## Tech Stack

- **Backend**: Python, FastAPI, spaCy (en_core_web_sm)
- **Frontend**: React (Vite), plain CSS
- **Animation**: CWA Signing Avatar (WebGL 3D) with real HamNoSys SiGML sign files

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
```

The API server starts at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## API

### POST /translate

**Request:**
```json
{ "text": "I am eating food" }
```

**Response:**
```json
{
  "gloss": ["me", "eat", "food"],
  "signs": ["me", "eat", "food"]
}
```

### GET /sign-words

Returns every token that has a matching `SignFiles/<word>.sigml` file (sorted list, ~850 entries):

```json
{ "words": ["about", "eat", "hello", "..."] }
```

## Example Sentences

| Input | Signs Played |
|---|---|
| I am eating food | me, eat, food |
| Good morning | good, morning |
| Hello welcome | hello, welcome |
| Please help me | please, help-me, me |
| I want water | me, want, water |
| Thank you | thankyou |
| She is going to school | her, go, class |

Use **Sign library** below the avatar to browse all ~850 words that have a `.sigml` file and play any sign on its own.

