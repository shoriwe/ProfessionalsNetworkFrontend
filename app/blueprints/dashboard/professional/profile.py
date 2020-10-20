import flask

import constants


def profile(cookie: str, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/profile.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_information_update(cookie, request.form, current_app)
        return current_app.config["APIController"].request_profile(cookie)
    return flask.redirect("/login")


def skills(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/skills/skills.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_skills_operations(cookie, account_id, request.form, current_app)
        return {"Skills": list(filter(lambda node: node["type"] == "Skill", current_app.config["APIController"]
                                      .request_profile(cookie)["nodes"][1:]))}
    return flask.redirect("/login")


def add_skills(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html", front_page="dashboard/professional/skills"
                                                                                 "/skills-add.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_skills_operations(cookie, account_id, request.form, current_app)
    return {}


def languages(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/languages/languages.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_languages_operations(cookie, account_id, request.form, current_app)
        return {"Languages": list(filter(lambda node: node["type"] == "Language", current_app.config["APIController"]
                                         .request_profile(cookie)["nodes"][1:]))}
    return flask.redirect("/login")


def add_languages(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html", front_page="dashboard/professional/languages"
                                                                                 "/languages-add.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_languages_operations(cookie, account_id, request.form, current_app)
    return {}


def handle_information_update(cookie: str, information: dict, current_app: flask.Flask) -> dict:
    if information.get("liked-skills") == "true":
        return current_app.config["APIController"].change_professional_liked_only(cookie, True)
    elif information.get("liked-skills") == "false":
        return current_app.config["APIController"].change_professional_liked_only(cookie, False)
    elif information.get("available") == "true":
        return current_app.config["APIController"].change_professional_available(cookie, True)
    elif information.get("available") == "false":
        return current_app.config["APIController"].change_professional_available(cookie, False)
    elif information.get("remote") == "true":
        return current_app.config["APIController"].change_professional_remote(cookie, True)
    elif information.get("remote") == "false":
        return current_app.config["APIController"].change_professional_remote(cookie, False)
    elif information.get("location") in constants.countries:
        return current_app.config["APIController"].change_location(cookie, information.get("location"))
    elif information.get("nationality") in constants.nationalities:
        return current_app.config["APIController"].change_professional_nationality(cookie,
                                                                                   information.get("nationality"))
    elif information.get("gender") in ("Male", "Female", "Other"):
        return current_app.config["APIController"].change_professional_gender(cookie, information.get("gender"))
    elif information.get("description") is not None:
        return current_app.config["APIController"].change_description(cookie, information.get("description"))
    return {"Error": "Sorry but I can't understand you"}


def handle_skills_operations(cookie: str, account_id: int, form: dict, current_app: flask.Flask) -> dict:
    if form.get("delete-skill") is not None:
        return current_app.config["APIController"].know_skill(cookie, form.get("delete-skill"), False)
    if form.get("like-skill") is not None:
        return current_app.config["APIController"].like_skill(cookie, form.get("like-skill"), True)
    elif form.get("dislike-skill") is not None:
        return current_app.config["APIController"].like_skill(cookie, form.get("dislike-skill"), False)
    elif form.get("add-skill") is not None:
        return current_app.config["APIController"].know_skill(cookie, form.get("add-skill"), True)
    elif form.get("search-skills-query") is not None:
        return current_app.config["APIController"].search_skills(cookie, form.get("search-skills-query"), account_id)
    return {"Error": "Sorry but I can't understand you"}


def handle_languages_operations(cookie: str, account_id: int, form: dict, current_app: flask.Flask) -> dict:
    if form.get("delete-language") is not None:
        return current_app.config["APIController"].speaks_language(cookie, form.get("delete-language"), False)
    elif form.get("add-language") is not None:
        return current_app.config["APIController"].speaks_language(cookie, form.get("add-language"), True)
    elif form.get("search-languages-query") is not None:
        return current_app.config["APIController"].search_languages(cookie,
                                                                    form.get("search-languages-query"),
                                                                    account_id)
    return {"Error": "Sorry but I can't understand you"}
