from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
async def health_check():
    return {"status": "Test Driven"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)