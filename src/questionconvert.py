import json
from pprint import pprint

res = []

with open("questions.txt", "r", encoding="utf-8") as f:
    for chunk in f.read().split("---\n"):
        lines = [line.strip() for line in chunk.split("\n")]
        res.append(
            {
                "columnTitle": lines.pop(0),
                "questions": [
                    {
                        "prompt": lines.pop(0).split(":")[1].strip(),
                        "answer": lines.pop(0).strip(),
                    }
                    for _ in range(5)
                ],
            }
        )

pprint(res)
with open("au_questions.json", "w", encoding="utf-8") as f:
    json.dump(res, f)
