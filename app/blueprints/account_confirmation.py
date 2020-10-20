import flask

account_confirmation_blueprint = flask.blueprints.Blueprint("Account Confirmation", "account_confirmation")


def handle_account_confirmation(request: flask.Request) -> dict:
    username_hash = request.form.get("username-hash")
    email_key = request.form.get("email-key")
    sms_key = request.form.get("sms-key")
    if email_key and sms_key and username_hash:
        return flask.current_app.config["APIController"].confirm_registration(username_hash, email_key, sms_key)
    return {"Error": "No data provided"}


def handle_email_phone_number_confirmation(request: flask.Request) -> dict:
    username_hash = request.form.get("username-hash")
    email_key = request.form.get("email-key")
    sms_key = request.form.get("sms-key")
    if email_key and sms_key and username_hash:
        return flask.current_app.config["APIController"].confirm_email_phone_number(username_hash, email_key, sms_key)
    return {"Error": "No data provided"}


@account_confirmation_blueprint.route("/register/confirmation", methods=("GET", "POST"))
def register_confirmation():
    if (not len(flask.request.args)) and (flask.request.method == "GET"):
        return flask.render_template("session-handling/account-confirmation/account-confirmation-notification.html")
    if all(key in flask.request.args.keys() for key in
           ("email-key", "username-hash")) and flask.request.method == "GET":
        return flask.render_template("session-handling/account-confirmation/account-confirmation.html")
    elif flask.request.method == "POST":
        return handle_account_confirmation(flask.request)
    else:
        return "Looks like we could not understand your message"  # Needs its own page


@account_confirmation_blueprint.route("/email/phone/number/change/confirmation", methods=("GET", "POST"))
def email_phone_number_change_confirmation():
    if (not len(flask.request.args)) and (flask.request.method == "GET"):
        return flask.render_template(
            "session-handling/account-confirmation/email-phone-number-confirmation-notification.html")
    if all(key in flask.request.args.keys() for key in
           ("email-key", "username-hash")) and flask.request.method == "GET":
        return flask.render_template("session-handling/account-confirmation/email-phone-number-confirmation.html")
    elif flask.request.method == "POST":
        return handle_email_phone_number_confirmation(flask.request)
    else:
        return "Looks like we could not understand your message"  # Needs its own page
