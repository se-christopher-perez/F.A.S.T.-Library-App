
from config import app, db
from models import User, Project, Lookup, LookupProject, Tag, LookupTag

with app.app_context():

    print("Clearing existing data...")
    LookupTag.query.delete()
    LookupProject.query.delete()
    Lookup.query.delete()
    Project.query.delete()
    Tag.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating users...")

    user_1 = User(username="user_1")
    user_1.password_hash = "password123"

    user_2 = User(username="user_2")
    user_2.password_hash = "password123"

    db.session.add_all([user_1, user_2])
    db.session.commit()

    print("Creating projects...")

    project_flask_api = Project(
        title="project_flask_api",
        description="A REST API built with Flask, Flask-RESTful, and SQLAlchemy.",
        language="python",
        user_id=user_1.id
    )

    project_react_dashboard = Project(
        title="project_react_dashboard",
        description="A React dashboard using Context API for state management.",
        language="javascript",
        user_id=user_1.id
    )

    project_data_analysis = Project(
        title="project_data_analysis",
        description="A Pandas-based data analysis project for hospitality sales.",
        language="python",
        user_id=user_2.id
    )

    project_portfolio_site = Project(
        title="project_portfolio_site",
        description="A personal portfolio site built with React and deployed on Netlify.",
        language="javascript",
        user_id=user_2.id
    )

    db.session.add_all([
        project_flask_api,
        project_react_dashboard,
        project_data_analysis,
        project_portfolio_site
    ])
    db.session.commit()

    print("Creating lookups...")

    lookup_flask_routes = Lookup(
        title="lookup_flask_routes",
        description="How do I define a Flask route?",
        category="Syntax",
        content='@app.route("/bills", methods=["GET"])\ndef get_bills():\n    return jsonify(bills), 200',
        beginner_explanation="A route connects a URL to a piece of Python code that runs when visited.",
        advance_explanation="Flask uses Werkzeug's routing system under the hood to match URL rules to view functions via a URL map.",
        user_id=user_1.id
    )

    lookup_sqlalchemy_relationships = Lookup(
        title="lookup_sqlalchemy_relationships",
        description="How do I define a one-to-many relationship in SQLAlchemy?",
        category="Syntax",
        content='user = db.relationship("User", back_populates="projects")\nprojects = db.relationship("Project", back_populates="user")',
        beginner_explanation="A relationship lets one table's rows reference rows in another table.",
        advance_explanation="back_populates keeps both sides of a bidirectional relationship in sync automatically when one side is modified.",
        user_id=user_1.id
    )

    lookup_react_context = Lookup(
        title="lookup_react_context",
        description="What is the syntax for creating and using Context in React?",
        category="Syntax",
        content='const AuthContext = createContext();\n\nfunction useAuth() {\n  return useContext(AuthContext);\n}\n\n<AuthContext.Provider value={{ user, login, logout }}>\n  {children}\n</AuthContext.Provider>',
        beginner_explanation="Context lets you share data with many components without passing props manually at every level.",
        advance_explanation="useContext subscribes a component to context changes, triggering a re-render whenever the provided value updates.",
        user_id=user_1.id
    )

    lookup_react_hooks = Lookup(
        title="lookup_react_hooks",
        description="What is the syntax for useState and useEffect?",
        category="Syntax",
        content='const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  fetchData();\n}, []);',
        beginner_explanation="useState stores a value that can change; useEffect runs code after render.",
        advance_explanation="useEffect's dependency array controls when the effect re-runs, and an empty array runs it only once on mount.",
        user_id=user_2.id
    )

    lookup_pandas_dataframes = Lookup(
        title="lookup_pandas_dataframes",
        description="How do I create and filter a Pandas DataFrame?",
        category="Syntax",
        content='import pandas as pd\n\ndf = pd.DataFrame(sales_data)\nfiltered = df[df["revenue"] > 100]',
        beginner_explanation="A DataFrame is a table of data with rows and columns, like an Excel sheet.",
        advance_explanation="DataFrames support vectorized operations, making column-wise computations far faster than iterating row by row.",
        user_id=user_2.id
    )

    lookup_pandas_groupby = Lookup(
        title="lookup_pandas_groupby",
        description="How do I aggregate sales data by employee using groupby?",
        category="Algorithm",
        content='df.groupby("employee_id")["total_sale"].sum().reset_index()',
        beginner_explanation="groupby lets you summarize data by category, like total sales per employee.",
        advance_explanation="groupby follows a split-apply-combine pattern, splitting data by key, applying a function to each group, then combining the results.",
        user_id=user_2.id
    )

    lookup_fetch_syntax = Lookup(
        title="lookup_fetch_syntax",
        description="What is the syntax for a POST request using fetch?",
        category="Syntax",
        content='fetch("http://localhost:5555/login", {\n  method: "POST",\n  credentials: "include",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ username, password })\n})\n  .then((response) => response.json())\n  .then((data) => console.log(data))\n  .catch((error) => console.error(error));',
        beginner_explanation="fetch sends a request to a URL and returns a response you can read.",
        advance_explanation="credentials: 'include' is required to send and receive session cookies on cross-origin requests.",
        user_id=user_1.id
    )

    lookup_pip_install = Lookup(
        title="lookup_pip_install",
        description="What is the command to install a package with pipenv?",
        category="Tools",
        content='pipenv install flask-cors --break-system-packages',
        beginner_explanation="This installs a package and adds it to your Pipfile automatically.",
        advance_explanation="--break-system-packages is only needed in environments where pip refuses to install outside a virtualenv it recognizes as managed.",
        user_id=user_2.id
    )

    lookup_quadratic_formula = Lookup(
        title="lookup_quadratic_formula",
        description="What is the quadratic formula for solving ax^2 + bx + c = 0?",
        category="Formula",
        content="x = (-b plus-or-minus sqrt(b^2 - 4ac)) / 2a",
        beginner_explanation="This formula finds the values of x where a parabola crosses zero.",
        advance_explanation="The discriminant (b^2 - 4ac) determines whether the roots are real and distinct, real and equal, or complex.",
        user_id=user_1.id
    )

    db.session.add_all([
        lookup_flask_routes,
        lookup_sqlalchemy_relationships,
        lookup_react_context,
        lookup_react_hooks,
        lookup_pandas_dataframes,
        lookup_pandas_groupby,
        lookup_fetch_syntax,
        lookup_pip_install,
        lookup_quadratic_formula
    ])
    db.session.commit()

    print("Connecting lookups to projects...")


    lookup_project_flask_routes = LookupProject(
        lookup_id=lookup_flask_routes.id,
        project_id=project_flask_api.id
    )

    lookup_project_sqlalchemy_relationships = LookupProject(
        lookup_id=lookup_sqlalchemy_relationships.id,
        project_id=project_flask_api.id
    )

    lookup_project_fetch_syntax = LookupProject(
        lookup_id=lookup_fetch_syntax.id,
        project_id=project_flask_api.id
    )

    lookup_project_react_context = LookupProject(
        lookup_id=lookup_react_context.id,
        project_id=project_react_dashboard.id
    )

    lookup_project_quadratic_formula = LookupProject(
        lookup_id=lookup_quadratic_formula.id,
        project_id=project_react_dashboard.id
    )

    lookup_project_pandas_dataframes = LookupProject(
        lookup_id=lookup_pandas_dataframes.id,
        project_id=project_data_analysis.id
    )

    lookup_project_pandas_groupby = LookupProject(
        lookup_id=lookup_pandas_groupby.id,
        project_id=project_data_analysis.id
    )

    lookup_project_pip_install = LookupProject(
        lookup_id=lookup_pip_install.id,
        project_id=project_data_analysis.id
    )

    lookup_project_react_hooks_data_analysis = LookupProject(
        lookup_id=lookup_react_hooks.id,
        project_id=project_data_analysis.id
    )

    lookup_project_react_hooks_portfolio = LookupProject(
        lookup_id=lookup_react_hooks.id,
        project_id=project_portfolio_site.id
    )

    db.session.add_all([
        lookup_project_flask_routes,
        lookup_project_sqlalchemy_relationships,
        lookup_project_fetch_syntax,
        lookup_project_react_context,
        lookup_project_quadratic_formula,
        lookup_project_pandas_dataframes,
        lookup_project_pandas_groupby,
        lookup_project_pip_install,
        lookup_project_react_hooks_data_analysis,
        lookup_project_react_hooks_portfolio
    ])
    db.session.commit()

    print("Creating tags...")

    tag_python = Tag(name="python")
    tag_javascript = Tag(name="javascript")
    tag_pandas = Tag(name="pandas")
    tag_react = Tag(name="react")

    db.session.add_all([tag_python, tag_javascript, tag_pandas, tag_react])
    db.session.commit()

    print("Connecting tags to lookups (with intentional duplicates)...")

    lookup_tags = [
        LookupTag(lookup_id=lookup_flask_routes.id, tag_id=tag_python.id),
        LookupTag(lookup_id=lookup_sqlalchemy_relationships.id, tag_id=tag_python.id),

        LookupTag(lookup_id=lookup_react_context.id, tag_id=tag_javascript.id),
        LookupTag(lookup_id=lookup_react_context.id, tag_id=tag_react.id),

        LookupTag(lookup_id=lookup_react_hooks.id, tag_id=tag_javascript.id),
        LookupTag(lookup_id=lookup_react_hooks.id, tag_id=tag_react.id),

        LookupTag(lookup_id=lookup_pandas_dataframes.id, tag_id=tag_python.id),
        LookupTag(lookup_id=lookup_pandas_dataframes.id, tag_id=tag_pandas.id),

        LookupTag(lookup_id=lookup_pandas_groupby.id, tag_id=tag_python.id),
        LookupTag(lookup_id=lookup_pandas_groupby.id, tag_id=tag_pandas.id),

        LookupTag(lookup_id=lookup_fetch_syntax.id, tag_id=tag_javascript.id),

        LookupTag(lookup_id=lookup_pip_install.id, tag_id=tag_python.id),
    ]

    db.session.add_all(lookup_tags)
    db.session.commit()

    print("Seed complete!")