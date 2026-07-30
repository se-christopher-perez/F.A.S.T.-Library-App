
from config import app, db, migrate
from models import User, Project, Lookup, LookupProject, Tag, LookupTag

if __name__ == "__main__":
    app.run(port=5555, debug=True)