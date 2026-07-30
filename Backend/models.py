
from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin  



class User(db.Model, SerializerMixin):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    projects = db.relationship("Project", back_populates="user", cascade="all, delete-orphan")
    lookups = db.relationship("Lookup", back_populates="user", cascade="all, delete-orphan")

    @property
    def password_hash(self):
        raise AttributeError("password_hash is not readable!")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates('username')
    def validate_username(self, key, value):
        if not value or len(value) < 3:
            raise ValueError("Username must be at least 3 characters")
        return value

    

class Project(db.Model, SerializerMixin):

    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship("User", back_populates="projects")
    lookup_projects = db.relationship("LookupProject", back_populates="project")



class LookupProject(db.Model, SerializerMixin):

    __tablename__ = "lookup_projects"

    id = db.Column(db.Integer, primary_key=True)
    lookup_id = db.Column(db.Integer, db.ForeignKey('lookups.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    lookup = db.relationship("Lookup", back_populates="lookup_projects")
    project = db.relationship("Project", back_populates="lookup_projects")



class Lookup(db.Model, SerializerMixin):

    __tablename__ = "lookups"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    language = db.Column(db.String)
    category = db.Column(db.String)
    content = db.Column(db.String)
    beginner_explanation = db.Column(db.String)
    advance_explanation = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship("User", back_populates="lookups")

    lookup_projects = db.relationship("LookupProject", back_populates="lookup")
    lookup_tags = db.relationship("LookupTag", back_populates="lookup")



class LookupTag(db.Model, SerializerMixin):

    __tablename__ = "lookup_tags"

    id = db.Column(db.Integer, primary_key=True)
    lookup_id = db.Column(db.Integer, db.ForeignKey('lookups.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    lookup = db.relationship("Lookup", back_populates="lookup_tags")
    tag = db.relationship("Tag", back_populates="lookup_tags")



class Tag(db.Model, SerializerMixin):

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    lookup_tags = db.relationship("LookupTag", back_populates="tag")
