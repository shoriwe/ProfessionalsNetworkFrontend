import flask

reset_blueprint = flask.Blueprint("Reset-Password", "reset_password")


def handle_request_reset_password(request: flask.Request) -> dict:
    username = request.form.get("username")
    if username:
        flask.current_app.config['APIController'].request_reset_password(username)
    return {"Success": "Check your email inbox"}


def handle_password_reset(request: flask.Request) -> dict:
    username_hash = request.form.get("username-hash")
    reset_key = request.form.get("reset-key")
    password = request.form.get("password")
    password_confirmation = request.form.get("password-confirmation")
    if username_hash and reset_key and password and password_confirmation:
        return flask.current_app.config["APIController"].reset_password(username_hash, reset_key,
                                                                        password, password_confirmation)
    return {"Error": "No data provided"}


@reset_blueprint.route("/reset/password", methods=("GET", "POST"))
def reset_password():
    if flask.request.method == "GET":
        if not len(flask.request.args):
            return flask.render_template("session-handling/reset-password/request-password-reset.html")
        elif all(key in flask.request.args.keys() for key in
                 ("username-hash", "reset-key")):
            return flask.render_template("session-handling/reset-password/reset-password.html")
    elif flask.request.method == "POST":
        if "username" in flask.request.form:
            return handle_request_reset_password(flask.request)
        elif all(key in flask.request.form
                 for key in ("username-hash", "reset-key", "password", "password-confirmation")):
            return handle_password_reset(flask.request)
    return "Looks like we could not understand your message"  # Needs its own page
