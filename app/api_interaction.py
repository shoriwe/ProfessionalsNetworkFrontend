import requests


class APIController(object):
    def __init__(self, target_uri: str, api_key: str):
        self.__target_uri = target_uri
        self.__api_key = api_key

    def login(self, username: str, password: str) -> dict:
        credentials = {
            "Username": username,
            "Password": password,
            "APIKey": self.__api_key
        }
        response = requests.post(f"{self.__target_uri}/general/login", json=credentials)
        return response.json()

    def register(self, name: str, username: str, password: str,
                 password_confirmation: str, email: str, country_code: str, phone_number: str,
                 account_type: str) -> dict:
        user_information = {
            "Name": name,
            "Username": username,
            "Password": password,
            "PasswordConfirmation": password_confirmation,
            "Email": email,
            "EmailConfirmation": email,
            "CountryCode": country_code,
            "PhoneNumber": phone_number,
            "AccountType": account_type,
            "APIKey": self.__api_key
        }
        response = requests.post(f"{self.__target_uri}/general/register", json=user_information)
        return response.json()

    def confirm_registration(self, username_hash: str, email_key: str, phone_key: str) -> dict:
        confirmation_data = {
            "UsernameHash": username_hash,
            "EmailKey": email_key,
            "PhoneKey": phone_key,
            "APIKey": self.__api_key
        }
        response = requests.post(f"{self.__target_uri}/general/confirm/registration", json=confirmation_data)
        return response.json()

    def request_reset_password(self, username: str) -> dict:
        wanted_user = {
            "Username": username,
            "APIKey": self.__api_key
        }
        response = requests.post(f"{self.__target_uri}/general/request/password/reset", json=wanted_user)
        return response.json()

    def reset_password(self, username_hash: str, reset_key: str, password: str, password_confirmation: str) -> dict:
        reset_password_information = {
            "UsernameHash": username_hash,
            "ResetKey": reset_key,
            "NewPassword": password,
            "NewPasswordConfirmation": password_confirmation,
            "APIKey": self.__api_key
        }
        response = requests.post(f"{self.__target_uri}/general/reset/password", json=reset_password_information)
        return response.json()

    def account_type(self, cookie: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie
        }
        response = requests.post(f"{self.__target_uri}/general/account/type", json=account_data)
        return response.json()

    def request_profile(self, cookie: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie
        }
        response = requests.post(f"{self.__target_uri}/general/request/profile", json=account_data)
        return response.json()

    def change_description(self, cookie: str, description: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Description": description
        }
        response = requests.post(f"{self.__target_uri}/general/change/description", json=account_data)

        return response.json()

    def change_location(self, cookie: str, location: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Location": location
        }
        response = requests.post(f"{self.__target_uri}/general/change/location", json=account_data)

        return response.json()

    def change_professional_gender(self, cookie: str, gender: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Gender": gender
        }
        response = requests.post(f"{self.__target_uri}/professional/change/gender", json=account_data)
        return response.json()

    def change_professional_available(self, cookie: str, remote: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Available": remote
        }
        response = requests.post(f"{self.__target_uri}/professional/change/available", json=account_data)
        return response.json()

    def change_professional_remote(self, cookie: str, remote: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Remote": remote
        }

        response = requests.post(f"{self.__target_uri}/professional/change/remote", json=account_data)
        return response.json()

    def change_professional_nationality(self, cookie: str, nationality: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Nationality": nationality
        }

        response = requests.post(f"{self.__target_uri}/professional/change/nationality", json=account_data)
        return response.json()

    def change_professional_liked_only(self, cookie, like_only: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "LikedOnly": like_only
        }
        response = requests.post(f"{self.__target_uri}/professional/change/liked/only", json=account_data)
        return response.json()

    def know_skill(self, cookie, skill: str, know: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Skill": skill,
            "Know": know
        }
        response = requests.post(f"{self.__target_uri}/professional/know/skill", json=account_data)
        return response.json()

    def like_skill(self, cookie: str, skill: str, like: bool):
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Skill": skill,
            "Like": like
        }
        response = requests.post(f"{self.__target_uri}/professional/like/skill", json=account_data)
        return response.json()

    def search_skills(self, cookie: str, search_query: str, object_id: int) -> dict:
        auth = self.account_type(cookie)
        if auth.get("Error") is None:
            search_query = {
                "APIKey": self.__api_key,
                "Cookie": cookie,
                "SearchQuery": search_query,
                "ObjectID": object_id
            }
            response = requests.post(f"{self.__target_uri}/general/search/skills", json=search_query)
            return response.json()
        return auth

    def search_languages(self, cookie: str, search_query: str, object_id: int) -> dict:
        auth = self.account_type(cookie)
        if auth.get("Error") is None:
            search_query = {
                "APIKey": self.__api_key,
                "Cookie": cookie,
                "SearchQuery": search_query,
                "ObjectID": object_id
            }
            response = requests.post(f"{self.__target_uri}/general/search/languages", json=search_query)
            return response.json()
        return auth

    def speaks_language(self, cookie: str, language: str, speaks: bool) -> dict:
        account_data = {
            "Cookie": cookie,
            "APIKey": self.__api_key,
            "Language": language,
            "Speaks": speaks
        }
        response = requests.post(f"{self.__target_uri}/professional/speak/language", json=account_data)
        return response.json()

    def change_password(self, cookie: str, old_password: str, new_password: str,
                        new_password_confirmation: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "OldPassword": old_password,
            "NewPassword": new_password,
            "NewPasswordConfirmation": new_password_confirmation
        }
        response = requests.post(f"{self.__target_uri}/general/change/password", json=account_data)
        return response.json()

    def request_account(self, cookie: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie
        }
        response = requests.post(f"{self.__target_uri}/general/request/account", json=account_data)
        return response.json()

    def request_change_email_phone_number(self, cookie: str, email: str, country_code: str, phone_number: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Email": email,
            "CountryCode": country_code,
            "PhoneNumber": phone_number
        }
        response = requests.post(f"{self.__target_uri}/general/request/change/email/phone/number", json=account_data)
        return response.json()

    def confirm_email_phone_number(self, username_hash: str, email_key: str, phone_key: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "UsernameHash": username_hash,
            "EmailKey": email_key,
            "PhoneKey": phone_key
        }
        response = requests.post(f"{self.__target_uri}/general/confirm/new/email/phone/number", json=account_data)
        return response.json()

    def create_team(self, cookie: str, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "TeamName": team_name
        }
        response = requests.post(f"{self.__target_uri}/contractor/create/team", json=account_data)
        return response.json()

    def find_professionals(self, cookie: str, search_filter: dict) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie
        }
        account_data.update(search_filter)

        response = requests.post(f"{self.__target_uri}/contractor/find/professionals", json=account_data)
        return response.json()

    def invite_professional(self, cookie: str, team_name: str, professional_id: int) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "TeamName": team_name,
            "ProfessionalID": professional_id
        }
        response = requests.post(f"{self.__target_uri}/contractor/invite/professional/to/team", json=account_data)
        return response.json()

    def accept_invitation(self, cookie: str, invitation_key: str, accept: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "InvitationKey": invitation_key,
            "Accept": accept
        }
        response = requests.post(f"{self.__target_uri}/professional/accept/team/invitation", json=account_data)
        return response.json()

    def remove_professional_from_team(self, cookie: str, professional_id: int, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "ProfessionalID": professional_id,
            "TeamName": team_name
        }
        response = requests.post(f"{self.__target_uri}/contractor/remove/professional/from/team", json=account_data)
        return response.json()

    def exit_from_team(self, cookie: str, contractor_id: int, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "ContractorID": contractor_id,
            "TeamName": team_name
        }
        response = requests.post(f"{self.__target_uri}/professional/exit/from/team", json=account_data)
        return response.json()

    def dissolve_team(self, cookie: str, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "TeamName": team_name
        }
        response = requests.post(f"{self.__target_uri}/contractor/dissolve/team", json=account_data)
        return response.json()

    def apply_to_team(self, cookie: str, contractor_id: int, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "TeamName": team_name,
            "ContractorID": contractor_id
        }
        response = requests.post(f"{self.__target_uri}/professional/apply/to/team", json=account_data)
        return response.json()

    def accept_professional_in_team(self, cookie: str, application_key: str, accept: bool) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "ApplicationKey": application_key,
            "Accept": accept
        }
        response = requests.post(f"{self.__target_uri}/contractor/accept/professional/in/team", json=account_data)
        return response.json()

    def request_team_members(self, cookie: str, contractor_id: int, team_name: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "ContractorID": contractor_id,
            "TeamName": team_name
        }
        response = requests.post(f"{self.__target_uri}/general/request/team/members", json=account_data)
        return response.json()

    def request_owned_teams(self, cookie: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
        }
        response = requests.post(f"{self.__target_uri}/contractor/request/owned/teams", json=account_data)
        return response.json()

    def search_teams(self, cookie: str, search_query: str) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "Query": search_query
        }
        response = requests.post(f"{self.__target_uri}/professional/search/teams", json=account_data)
        return response.json()

    def request_professional_information(self, cookie: str, professional_id: int) -> dict:
        account_data = {
            "APIKey": self.__api_key,
            "Cookie": cookie,
            "AccountID": professional_id
        }
        response = requests.post(f"{self.__target_uri}/general/request/professional/information", json=account_data)
        return response.json()
