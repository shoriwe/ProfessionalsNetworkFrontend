import base64
import json
import urllib.parse

import flask


def teams(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/contractor/teams/teams.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {}


def teams_accept_applicant(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        if request.args.get("application-key") is not None:
            return flask.render_template("dashboard/dashboard-page.html",
                                         front_page="dashboard/invitation-acceptation.html",
                                         title="Accept applicant")
        return flask.redirect("/dashboard/teams")
    elif request.method == "POST":
        if all((request.form.get("application-key"), request.form.get("decline"))):
            invitation_key, _ = (request.form.get("application-key"), request.form.get("decline"))
            return current_app.config["APIController"].accept_professional_in_team(cookie, invitation_key, False)
        elif all((request.form.get("application-key"), request.form.get("accept"))):
            invitation_key, _ = (request.form.get("application-key"), request.form.get("accept"))
            return current_app.config["APIController"].accept_professional_in_team(cookie, invitation_key, True)
    return {"Error": "Can't understand"}


def teams_view(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/contractor/teams/teams-view.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {}


def view_team_professionals(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return handle_professional_view(cookie, account_id, request.args, current_app)
    elif request.method == "POST":
        return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {}


def add_professionals_to_team(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/contractor/teams/add-members-to-team.html")
    elif request.method == "POST":
        return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {}


def handle_teams_operations(cookie: str, account_id: int, form: dict, current_app: flask.Flask):
    # Request owned teams
    if form.get("contractor-teams") is not None:
        return {"Teams": list(map(lambda node_: {"id": node_["id"], "ownerID": node_["ownerID"], "name": node_["name"],
                                                 "sname": node_["name"][:20]},
                                  current_app.config["APIController"].request_owned_teams(cookie)))}
    # Delete Team
    elif form.get("delete-team") is not None:
        return current_app.config["APIController"].dissolve_team(cookie, form.get("delete-team"))
    # Create Team
    elif form.get("create-team") is not None:
        return current_app.config["APIController"].create_team(cookie, form.get("create-team"))
    # Request team members
    elif all((form.get("team-name"), form.get("request-members"))):
        team_name, _ = (form.get("team-name"), form.get("request-members"))
        results = current_app.config["APIController"].request_team_members(cookie, account_id, team_name)
        if results.get("nodes"):
            # Changing member nodes
            for index, node in enumerate(results["nodes"][1:]):
                if "OWNS" in node[2]:
                    results["nodes"][index + 1][0]["sname"] = "YOU"
                else:
                    results["nodes"][index + 1][0]["sname"] = results["nodes"][index + 1][0]["name"][:11]
            # The Team Node
            results["nodes"][0]["sname"] = results["nodes"][0]["name"][:20]
            return results
    # Invite professional
    elif all((form.get("professional-id"), form.get("team-name"), form.get("add"))):
        professional_id, team_name, _ = (form.get("professional-id"), form.get("team-name"), form.get("add"))
        if professional_id.isnumeric():
            professional_id = int(professional_id)
            return current_app.config["APIController"].invite_professional(cookie, team_name, professional_id)
    # Remove Professional
    elif all((form.get("professional-id"), form.get("team-name"), form.get("remove"))):
        professional_id, team_name, _ = (form.get("professional-id"), form.get("team-name"), form.get("remove"))
        if professional_id.isnumeric():
            professional_id = int(professional_id)
            return current_app.config["APIController"].remove_professional_from_team(cookie, professional_id, team_name)
    # View Professional
    elif all((form.get("professional-id"), form.get("team-name"), form.get("view"))):
        professional_id, team_name, _ = (form.get("professional-id"), form.get("team-name"), form.get("view"))
        if professional_id.isnumeric():
            professional_id = int(professional_id)
            return current_app.config["APIController"].request_team_members(cookie, professional_id, team_name)
    elif form.get("search-filter") is not None:
        return current_app.config["APIController"].find_professionals(cookie, json.loads(
            base64.b64decode(form.get("search-filter").encode()).decode()))
    return {"Error": "Can't understand"}


def handle_professional_view(cookie: str, account_id: int, args: dict, current_app: flask.Flask):
    if args.get("professional-id") is not None:
        if args.get("professional-id").isnumeric():
            professional_id = int(int(args.get("professional-id")))
            if account_id == professional_id:
                return flask.redirect("/dashboard/profile")
            elif args.get("team-name") is not None:
                result = current_app.config["APIController"].request_professional_information(cookie, professional_id)
                if "nodes" in result.keys():
                    result = result["nodes"][0]
                    if args.get("add"):
                        return flask.render_template("dashboard/dashboard-page.html",
                                                     front_page="dashboard/contractor/teams/view-professional-when-add.html",
                                                     available=result.get("available"),
                                                     liked_only=result.get("liked_only"),
                                                     remote=result.get("remote"),
                                                     description=result.get("description"),
                                                     gender=result.get("gender"),
                                                     location=result.get("location"),
                                                     professional=result.get("name")[:20],
                                                     nationality=result.get("nationality")
                                                     )
                    elif args.get("edit"):
                        return flask.render_template("dashboard/dashboard-page.html",
                                                     team_name=urllib.parse.quote(args.get("team-name")),
                                                     front_page="dashboard/contractor/teams/view-professional-when-edit.html",
                                                     available=result.get("available"),
                                                     liked_only=result.get("liked_only"),
                                                     remote=result.get("remote"),
                                                     description=result.get("description"),
                                                     gender=result.get("gender"),
                                                     location=result.get("location"),
                                                     professional=result.get("name")[:20],
                                                     nationality=result.get("nationality")
                                                     )
                return flask.redirect("/dashboard/teams/view?team-name=" + urllib.parse.quote(args.get("team-name")))
    return flask.redirect("/dashboard/teams")
