from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import replicate
import os
from dotenv import load_dotenv

load_dotenv()

replicate_client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN")) 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str

@app.post("/generate")
async def generate_image(prompt: Prompt):
    try:
        output = replicate_client.run(
            "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
            input={"prompt": prompt.text}
        )

        if isinstance(output, list) and len(output) > 0:
            return {"url": str(output[0])} 
        else:
            raise HTTPException(status_code=500, detail="Failed to image generate")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
