
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Project, Lookup, LookupProject, Tag, LookupTag

@app.before_request
def logged_in():

    open_routes = ["login", "signup", "check_session"]

    if request.endpoint in open_routes:
        return

    if not session.get("user_id"):
        return {"error": "Unauthorized"}, 401

class Signup(Resource):

    def post(self):

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"error": "username and password are required"}, 422

        try:

            user = User (
            
                username = username

            )

            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            return user.to_dict(), 201
        
        except ValueError as error:
            db.session.rollback()

            return {"error": str(error)}, 422

        except IntegrityError:
            db.session.rollback()

            return {"error": "username taken."}, 422

class Login(Resource):

    def post(self):

        data = request.get_json()

        user = User.query.filter_by(username=data.get("username")).first()

        if not user or not user.authenticate(data.get("password")):
            return {"error": "Invalid username or password"}, 401
        
        session["user_id"] = user.id

        return user.to_dict(), 200
    
class Logout(Resource):

    def delete(self):

        session["user_id"] = None

        return {}, 204

class CheckSession(Resource):

    def get(self):

        user_id = session.get("user_id")
        
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return {"error": "Not logged in"}, 401

        return user.to_dict(), 200

class Projects(Resource):

    def get(self):

        user_id = session.get("user_id")

        page = request.args.get("page", 1, type=int)

        per_page = request.args.get("per_page", 6, type=int)

        paginated = Project.query.filter_by(user_id=user_id).paginate(
            page=page, per_page=per_page, error_out=False
        )

        return {

            "projects": [project.to_dict() for project in paginated.items],
            "total_pages": paginated.pages,
            "current_page": paginated.page,
            "total_projects": paginated.total

        }, 200

    def post(self):

        user_id = session.get("user_id")

        data = request.get_json()

        try:

            new_project = Project(

                user_id = user_id,
                title = data["title"],
                description = data["description"],
                language = data["language"]

            )

            db.session.add(new_project)
            db.session.commit()

        except (ValueError, KeyError) as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return new_project.to_dict(), 201

class Lookups(Resource):

    def get(self):

        user_id = session.get("user_id")

        lookups = Lookup.query.filter_by(user_id=user_id).all()

        return [lookup.to_dict() for lookup in lookups], 200
        



api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Projects, "/projects", endpoint="projects")
api.add_resource(Lookups, "/lookups", endpoint="lookups")

if __name__ == "__main__":
    app.run(port=5555, debug=True)