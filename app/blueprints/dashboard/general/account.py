import flask


def account(cookie: str, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html", front_page="dashboard/account.html")
    elif request.method == "POST":
        return handle_account_update(cookie, request.form, current_app)
    return flask.redirect("/login")


def change_email_and_phone_number(cookie: str, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/change-email-and-phone-number.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_account_update(cookie, request.form, current_app)
        return current_app.config["APIController"].request_account(cookie)
    return flask.redirect("/login")


def handle_account_update(cookie: str, form: dict, current_app: flask.Flask) -> dict:
    result = {"Error": "Sorry, I can't understand"}
    if form.get("new-email") is not None:
        if form.get("new-phone-number-country-code") is not None:
            if form.get("new-phone-number") is not None:
                result = current_app.config["APIController"].request_change_email_phone_number(cookie,
                                                                                               form.get("new-email"),
                                                                                               form.get(
                                                                                                   "new-phone-number-country-code"),
                                                                                               form.get(
                                                                                                   "new-phone-number"))
    elif form.get("old-password") is not None:
        result = {"Error": "Sorry but I can't understand you"}
        new_passwords = (form.get("new-password"), form.get("new-password-confirmation"))
        if new_passwords[0] is not None and new_passwords[1] is not None:
            result = current_app.config["APIController"].change_password(cookie, form.get("old-password"),
                                                                         new_passwords[0], new_passwords[1])
    return result
