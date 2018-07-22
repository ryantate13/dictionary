📖 Dictionary 📚
================

Powered by [Wordset](https://github.com/wordset/wordset-dictionary).

## Installation

### Local Install

```bash
git clone https://github.com/ryantate13/dictionary.git
cd dictionary
yarn && yarn start
```

### Using Docker

```bash
sudo docker run -p 3003:3003 ryantate13/dictionary
```

## Search

### Search For a Specific Word

Make a ```GET``` request to ```/:word```. Returns a 404 if the word is not found.

#### Example Response

```GET``` ```/foo```

```json
{
  "error": "not found"
}
```

```GET``` ```/foolishly```

```json
{
  "word": "foolishly",
  "wordset_id": "54bd55e87265742391a22500",
  "meanings": [
    {
      "id": "54bd55e87265742391a42500",
      "def": "without good sense or judgment",
      "example": "They acted foolishly when they agreed to come.",
      "speech_part": "adverb",
      "synonyms": [
        "unwisely"
      ]
    }
  ],
  "editors": [
    "bryanedu"
  ],
  "contributors": [
    "zellerpress",
    "msingle",
    "sabreuse"
  ]
}
```

### Search for Words Matching a Predicate

Make a ```GET``` request to ```/search/:term```. All words starting with the search term will be returned.

#### Example Response

```GET``` ```/search/foo```

```json
[
  {
    "word": "foolishly",
    "wordset_id": "54bd55e87265742391a22500",
    "meanings": [
      {
        "id": "54bd55e87265742391a42500",
        "def": "without good sense or judgment",
        "example": "They acted foolishly when they agreed to come.",
        "speech_part": "adverb",
        "synonyms": [
          "unwisely"
        ]
      }
    ],
    "editors": [
      "bryanedu"
    ],
    "contributors": [
      "zellerpress",
      "msingle",
      "sabreuse"
    ]
  },
  "..."
]
```