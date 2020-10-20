import flask

import contractor.profile
import contractor.teams
import general.account
import professional
import professional.profile
import professional.teams

dashboard_blueprint = flask.Blueprint("Dashboard", "dashboard")


def validate_cookie(cookie: str) -> (str, str, bool):
    if cookie:
        account_information = flask.current_app.config["APIController"].account_type(cookie)
        account_type = account_information.get("AccountType")
        username = account_information.get("Username")
        account_id = account_information.get("AccountID")
        return username, account_type, account_id, (
                username is not None and account_type is not None and account_id is not None)
    return None, None, None, False


@dashboard_blueprint.route("/dashboard", methods=("GET",))
def dashboard():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_valid_cookie = validate_cookie(cookie)
    if is_valid_cookie:
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/home.html")
    return flask.redirect("/login")


######


@dashboard_blueprint.route("/dashboard/account", methods=("GET", "POST"))
def account():
    cookie = flask.request.cookies.get("session")
    _, account_type, _, is_valid_cookie = validate_cookie(cookie)
    if is_valid_cookie:
        return general.account.account(cookie, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/account/email/phone/number", methods=("GET", "POST"))
def account_email_phone_number():
    cookie = flask.request.cookies.get("session")
    _, account_type, _, is_valid_cookie = validate_cookie(cookie)
    if is_valid_cookie:
        return general.account.change_email_and_phone_number(cookie, flask.request, flask.current_app)
    return flask.redirect("/login")


######


@dashboard_blueprint.route("/dashboard/profile", methods=("GET", "POST"))
def profile():
    cookie = flask.request.cookies.get("session")
    _, account_type, _, is_valid_cookie = validate_cookie(cookie)
    if is_valid_cookie:
        if account_type == "Professional":
            return professional.profile.profile(cookie, flask.request, flask.current_app)
        elif account_type == "Contractor":
            return contractor.profile.profile(cookie, flask.request, flask.current_app)
    return flask.redirect("/login")


######


@dashboard_blueprint.route("/dashboard/profile/languages", methods=("GET", "POST"))
def languages():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.profile.languages(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/profile/languages/add", methods=("GET", "POST"))
def languages_add():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.profile.add_languages(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


######


@dashboard_blueprint.route("/dashboard/profile/skills", methods=("GET", "POST"))
def skills():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.profile.skills(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/profile/skills/add", methods=("GET", "POST"))
def skills_add():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.profile.add_skills(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


######


@dashboard_blueprint.route("/dashboard/teams", methods=("GET", "POST"))
def teams():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.teams.teams(cookie, account_id, flask.request, flask.current_app)
        elif account_type == "Contractor":
            return contractor.teams.teams(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/teams/invitation", methods=("GET", "POST"))
def teams_invitation():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.teams.teams_accept_invitation(cookie, account_id, flask.request, flask.current_app)
        elif account_type == "Contractor":
            return contractor.teams.teams(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/teams/view", methods=("GET", "POST"))
def teams_view():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.teams.teams_view(cookie, account_id, flask.request, flask.current_app)
        elif account_type == "Contractor":
            return contractor.teams.teams_view(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/teams/view/professional", methods=("GET", "POST"))
def teams_view_professional():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Professional":
            return professional.teams.view_team_professionals(cookie, account_id, flask.request, flask.current_app)
        elif account_type == "Contractor":
            return contractor.teams.view_team_professionals(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")


@dashboard_blueprint.route("/dashboard/teams/add/members", methods=("GET", "POST"))
def teams_add_members():
    cookie = flask.request.cookies.get("session")
    _, account_type, account_id, is_cookie_valid = validate_cookie(cookie)
    if is_cookie_valid:
        if account_type == "Contractor":
            return contractor.teams.add_professionals_to_team(cookie, account_id, flask.request, flask.current_app)
    return flask.redirect("/login")
