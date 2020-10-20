import flask

register_blueprint = flask.blueprints.Blueprint("Register", "register")


def validate_arguments(request: flask.Request) -> dict:
    values = [request.form.get(argument) for argument in ("name", "username", "password",
                                                          "password-confirmation", "email",
                                                          "country-code", "phone-number",
                                                          "account-type")]
    if all(values):
        return flask.current_app.config["APIController"].register(*values)
    return {"Error": "All arguments  required"}


@register_blueprint.route("/register", methods=("GET", "POST"))
def register():
    if flask.request.method == "POST":
        return validate_arguments(flask.request)
    return flask.render_template("session-handling/register.html")
