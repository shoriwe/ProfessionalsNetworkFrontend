import flask

import api_interaction
import blueprints.account_confirmation
import blueprints.dashboard.dashboard
import blueprints.index
import blueprints.login
import blueprints.register
import blueprints.reset_password
import setup_environment

app = flask.Flask(__name__, template_folder="./templates", static_folder="./static")


def configure():
    app.register_blueprint(blueprints.login.login_blueprint)
    app.register_blueprint(blueprints.register.register_blueprint)
    app.register_blueprint(blueprints.index.index_blueprint)
    app.register_blueprint(blueprints.account_confirmation.account_confirmation_blueprint)
    app.register_blueprint(blueprints.reset_password.reset_blueprint)
    app.register_blueprint(blueprints.dashboard.dashboard.dashboard_blueprint)

    variables = setup_environment.get_environment_variables()
    app.config["APIController"] = api_interaction.APIController(variables["BackendAPIUri"], variables["BackendAPIKey"])
