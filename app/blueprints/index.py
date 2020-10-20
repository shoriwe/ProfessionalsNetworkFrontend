import flask

index_blueprint = flask.blueprints.Blueprint("Index", "index")


@index_blueprint.route("/", methods=("GET", ))
@index_blueprint.route("/index", methods=("GET",))
def index():
    return flask.render_template("index.html")
