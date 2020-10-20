* Values Controlled by users
    * Team Name
        * Not vulnerable
            * Since the API only accept letters, numbers, spaces, minus sign, floor
    * Email
        * Not vulnerable (Maybe)
            * Since the API pass it through a ReGex
    * PhoneNumber
        * Not vulnerable (Requires implementation)
            * Since the API checks its validity with an external API
    * Username
        * Vulnerable
            * Since the API accepts anything on it
    * Description
        * Not vulnerable
            * Since the API only accept letters, numbers and spaces
    * Name
        * Not vulnerable
            * Since the API only accept letters, numbers and spaces
    * Password
        * Not Vulnerable
            * Since it is always stored as a hash hex
    * Location
        * Not vulnerable
            * Since the API compares the input with the values of an array
    * Nationality
        * Not vulnerable
            * Since the API compares the input with the values of an array
    * Gender
        * Not vulnerable
            * Since the API compares the input with the values of an array
    * Language
        * Not vulnerable
            * Since the API compares the input with the values of an array
    * Skills
        * Not Vulnerable
            * Since the API compares the input with the entries of the Database
