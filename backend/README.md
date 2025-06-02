## How to run the backend

1. Navigate to the backend folder:

cd backend

2. Activate your virtual environment (if you're using one):

source venv/bin/activate # On Linux/macOS
venv\Scripts\activate # On Windows


3. Run the API:

uvicorn app.main:app --reload


4. Visit `http://127.0.0.1:8000/docs` in your browser to see the API docs.
