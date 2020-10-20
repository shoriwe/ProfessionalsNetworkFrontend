import flask


def teams(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/teams/teams.html")
    elif request.method == "POST":
        if len(request.form):
            return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {}


def teams_accept_invitation(cookie: str, _: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        if request.args.get("invitation-key") is not None:
            return flask.render_template("dashboard/dashboard-page.html",
                                         front_page="dashboard/invitation-acceptation.html",
                                         title="Accept invitation")
        return flask.redirect("/dashboard/teams")
    elif request.method == "POST":
        if all((request.form.get("invitation-key"), request.form.get("decline"))):
            invitation_key, _ = (request.form.get("invitation-key"), request.form.get("decline"))
            return current_app.config["APIController"].accept_invitation(cookie, invitation_key, False)
        elif all((request.form.get("invitation-key"), request.form.get("accept"))):
            invitation_key, _ = (request.form.get("invitation-key"), request.form.get("accept"))
            return current_app.config["APIController"].accept_invitation(cookie, invitation_key, True)
    return {"Error": "Can't understand"}


def teams_view(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        return handle_team_view_selection(cookie, account_id, request.args, current_app)
    elif request.method == "POST":
        if len(request.form):
            return handle_teams_operations(cookie, account_id, request.form, current_app)
    return {"Error": "Can't understand"}


def view_team_professionals(cookie: str, account_id: int, request: flask.Request, current_app: flask.Flask):
    if request.method == "GET":
        result = handle_teams_operations(cookie, account_id, request.args, current_app)
        if result.get("id") == account_id:
            return flask.redirect("/dashboard/profile")
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/teams/view-team-professionals.html",
                                     available=result.get("available"),
                                     liked_only=result.get("liked_only"),
                                     remote=result.get("remote"),
                                     description=result.get("description"),
                                     gender=result.get("gender"),
                                     location=result.get("location"),
                                     professional=result.get("name")[:20],
                                     nationality=result.get("nationality")
                                     )
    return {"Error": "Can't understand"}


def handle_team_view_selection(_: str, __: int, args: dict, ___: flask.Flask):
    if args.get("member"):
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/teams/teams-view-member.html")
    elif args.get("not-member"):
        return flask.render_template("dashboard/dashboard-page.html",
                                     front_page="dashboard/professional/teams/teams-view-not-member.html",
                                     team_name=flask.escape(
                                         "Sorry but you are not part of " + args.get("team-name")[:15]))
    return flask.redirect("/dashboard/teams")


# Stuff related to teams happen here
def handle_teams_operations(cookie: str, _: int, form: dict, current_app: flask.Flask) -> dict:
    # Search for teams that the professional is member
    if form.get("professional-teams") is not None:
        results = current_app.config["APIController"].request_profile(cookie)
        if "nodes" in results:
            return {
                "Teams": list(
                    map(lambda node_: {"id": node_["id"][1:], "ownerID": node_["ownerID"], "name": node_["name"],
                                       "sname": node_["name"][:20]},
                        filter(lambda node_: node_["type"] == "Team", results["nodes"])))}
    # Search for teams by a query
    elif form.get("search-teams") is not None:
        results = current_app.config["APIController"].search_teams(cookie, form.get("search-teams"))
        if results is not dict:
            return {"Teams": list(map(lambda team: {"id": team["id"], "name": team["name"], "ownerID": team["ownerID"],
                                                    "sname": team["name"][:20]}, results))}
    # Delete a team
    elif all((form.get("delete-team"), form.get("contractor-id"))):
        team_name, contractor_id = (form.get("delete-team"), form.get("contractor-id"))
        if contractor_id.isnumeric():
            return current_app.config["APIController"].exit_from_team(cookie, int(contractor_id), team_name)
    # Apply to a team
    elif all((form.get("contractor-id"), form.get("team-name"), form.get("apply"))):
        contractor_id, team_name, _ = (form.get("contractor-id"), form.get("team-name"), form.get("apply"))
        if contractor_id.isnumeric():
            return current_app.config["APIController"].apply_to_team(cookie, int(contractor_id), team_name)
    # Request team members
    elif all((form.get("contractor-id"), form.get("team-name"), form.get("request-members"))) and not print(
            form):
        contractor_id, team_name, _ = (form.get("contractor-id"), form.get("team-name"), form.get("request-members"))
        results = current_app.config["APIController"].request_team_members(cookie, int(contractor_id), team_name)
        if results.get("nodes"):
            for index, node in enumerate(results["nodes"][1:]):
                if "OWNS" in node[2]:
                    results["nodes"][index + 1][0]["sname"] = "OWNER"
                else:
                    results["nodes"][index + 1][0]["sname"] = results["nodes"][index + 1][0]["name"][:11]
            results["nodes"][0]["sname"] = results["nodes"][0]["name"][:20]
        return results

    elif all((form.get("professional-id"), form.get("contractor-id"), form.get("team-name"))):
        professional_id, contractor_id, team_name = (
            form.get("professional-id"), form.get("contractor-id"), form.get("team-name"))
        if professional_id.isnumeric() and contractor_id.isnumeric():
            results = current_app.config["APIController"].request_team_members(cookie, int(contractor_id),
                                                                               team_name)
            if results.get("nodes"):
                professional = tuple(
                    filter(lambda node_: node_[0]["id"] == node_[0]["ownerID"] == int(professional_id),
                           results["nodes"][1:]))
                if len(professional):
                    return professional[0][0]
    return {"Error": "Can't understand"}
