import flask

import constants


def profile(cookie: str, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/contractor/profile.html")
    elif request.method == "POST":
        if len(flask.request.form):
            return handle_information_update(cookie, flask.request.form, current_app)
        return current_app.config["APIController"].request_profile(cookie)
    return flask.redirect("/login")


def handle_information_update(cookie: str, information: dict, current_app: flask.Flask):
    result = {"Error": "Sorry but I can't understand you"}

    if information.get("location") is not None:
        if information.get("location") in constants.countries:
            result = current_app.config["APIController"].change_location(cookie, information.get("location"))
    elif information.get("description") is not None:
        result = current_app.config["APIController"].change_description(cookie, information.get("description"))
    return result
