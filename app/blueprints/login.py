import flask

login_blueprint = flask.blueprints.Blueprint("Login", "login")


@login_blueprint.route("/login", methods=("GET", "POST"))
def login():
    if flask.request.method == "POST":
        username, password = (
            flask.request.form.get("username", default=False),
            flask.request.form.get("password", default=False)
        )
        if username and password:
            login_response = flask.current_app.config["APIController"].login(username, password)
            if "Error" not in login_response:
                return login_response
            return {"Error": "Username or password incorrect"}
    return flask.render_template("session-handling/login.html")
