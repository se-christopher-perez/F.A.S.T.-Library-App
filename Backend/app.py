
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

def hidden_forbidden_content(content, user_id):

    if not content:
        return {"error": "Project not found"}, 404
    
    if content.user_id != user_id:
        return {"error": "Unauthorized"}, 403
    
    return None

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

class ProjectByID(Resource):

    def patch(self, id):


        user_id = session.get("user_id")

        project = Project.query.filter_by(id=id).first()

        error = hidden_forbidden_content(project, user_id)

        if error:

            return error

        data = request.get_json()

        try:

            for key in ["title", "description", "language"]:

                if key in data:

                    setattr(project, key, data[key])

            db.session.commit()

        except ValueError as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return project.to_dict(), 200

    def delete(self, id):

        user_id = session.get("user_id")

        project = Project.query.filter_by(id=id).first()

        error = hidden_forbidden_content(project, user_id)

        if error:

            return error

        LookupProject.query.filter_by(project_id=project.id).delete()

        db.session.delete(project)

        db.session.commit()

        return (), 204

class Lookups(Resource):

    def get(self):

        user_id = session.get("user_id")

        page = request.args.get("page", 1, type=int)

        per_page = request.args.get("per_page", 4, type=int)

        paginated = Lookup.query.filter_by(user_id=user_id).paginate(
            page=page, per_page=per_page, error_out=False
        )

        return {

            "lookups": [lookup.to_dict() for lookup in paginated.items],
            "total_pages": paginated.pages,
            "current_page": paginated.page,
            "total_lookups": paginated.total

        }, 200

    def post(self):

        user_id = session.get("user_id")

        data = request.get_json()

        project_id = data.get("project_id")

        tag_names = data.get("tags", [])

        try:
            new_lookup = Lookup(

                user_id=user_id,
                title=data["title"],
                description=data["description"],
                category=data["category"],
                content=data["content"],
                beginner_explanation=data.get("beginner_explanation"),
                advance_explanation=data.get("advance_explanation")
                
            )

            db.session.add(new_lookup)
            db.session.commit() 

            if project_id:

                new_lookup_project = LookupProject(

                    lookup_id=new_lookup.id,
                    project_id=project_id

                )

                db.session.add(new_lookup_project)

            for tag_name in tag_names:

                tag = Tag.query.filter_by(name=tag_name).first()

                if not tag:

                    tag = Tag(name=tag_name)

                    db.session.add(tag)
                    db.session.commit()

                new_lookup_tag = LookupTag(

                    lookup_id=new_lookup.id,
                    tag_id=tag.id

                )

                db.session.add(new_lookup_tag)

            db.session.commit()

        except (ValueError, KeyError) as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return new_lookup.to_dict(), 201
        
class LookupByID(Resource):

    def patch(self, id):

        user_id = session.get("user_id")

        lookup = Lookup.query.filter_by(id=id).first()

        error = hidden_forbidden_content(lookup, user_id)

        if error:

            return error

        data = request.get_json()

        try:

            for key in ["title", "description", "category", "content", "beginner_explanation", "advance_explanation"]:

                if key in data:

                    setattr(lookup, key, data[key])

            db.session.commit()

        except ValueError as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return lookup.to_dict(), 200

    def delete(self, id):

        user_id = session.get("user_id")

        lookup = Lookup.query.filter_by(id=id).first()

        error = hidden_forbidden_content(lookup, user_id)

        if error:

            return error

        LookupProject.query.filter_by(lookup_id=lookup.id).delete()

        LookupTag.query.filter_by(lookup_id=lookup.id).delete()

        db.session.delete(lookup)
        
        db.session.commit()

        return {}, 204

class LookupTags(Resource):

    def post(self, lookup_id):

        user_id = session.get("user_id")

        lookup = Lookup.query.filter_by(id=lookup_id).first()

        error = hidden_forbidden_content(lookup, user_id)

        if error:

            return error

        data = request.get_json()

        tag_name = data.get("name")

        if not tag_name:

            return {"error": "Tag name is required!"}, 422

        tag = Tag.query.filter_by(name=tag_name).first()

        if not tag:

            tag = Tag(name=tag_name)

            db.session.add(tag)

            db.session.commit()

        exist = LookupTag.query.filter_by(lookup_id=lookup.id, tag_id=tag.id).first()

        if exist:

            return {"error": "Tag already connected to this lookup!"}, 422

        new_lookup_tag = LookupTag(lookup_id=lookup.id, tag_id=tag.id)

        db.session.add(new_lookup_tag)

        db.session.commit()

        return new_lookup_tag.to_dict(), 201

class LookupTagByID(Resource):

    def delete(self, lookup_id, tag_id):

        user_id = session.get("user_id")

        lookup = Lookup.query.filter_by(id=lookup_id).first()

        error = hidden_forbidden_content(lookup, user_id)

        if error:
            return error

        lookup_tag = LookupTag.query.filter_by(
            lookup_id=lookup_id, tag_id=tag_id
        ).first()

        if not lookup_tag:

            return {"error": "Connection not found"}, 404

        db.session.delete(lookup_tag)

        db.session.commit()

        return {}, 204

class Tags(Resource):

    def get(self):

        tags = Tag.query.all()

        return [tag.to_dict() for tag in tags]

    def post(self):

        user_id = session.get("user_id")

        data = request.get_json()

        tag_name = data.get("name")

        if not tag_name:

            return {"error": "Tag name is required!"}, 422

        exist = Tag.query.filter_by(name=tag_name).first()

        if exist:
            return {"error": "Tag already exists!"}, 422

        try: 

            new_tag = Tag(

                name=tag_name

            )

            db.session.add(new_tag)

            db.session.commit()

        except ValueError as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return new_tag.to_dict(), 201

class TagByID(Resource):

    def delete(self, id):

        tag = Tag.query.filter_by(id=id).first()

        if not tag:

            return {"error": "Tag not found"}, 404

        LookupTag.query.filter_by(tag_id=tag.id).delete()

        db.session.delete(tag)

        db.session.commit()

        return {}, 204

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Projects, "/projects", endpoint="projects")
api.add_resource(ProjectByID, "/projects/<int:id>", endpoint="project_by_id")
api.add_resource(Lookups, "/lookups", endpoint="lookups")
api.add_resource(LookupByID, "/lookups/<int:id>", endpoint="lookup_by_id")
api.add_resource(LookupTags, "/lookups/<int:lookup_id>/tags", endpoint="lookup_tags")
api.add_resource(LookupTagByID, "/lookups/<int:lookup_id>/tags/<int:tag_id>", endpoint="lookup_tag_by_id")
api.add_resource(Tags, "/tags", endpoint="tags")
api.add_resource(TagByID, "/tags/<int:id>", endpoint="tag_by_id")


if __name__ == "__main__":
    app.run(port=5555, debug=True)