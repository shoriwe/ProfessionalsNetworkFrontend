import os


def read_environment_variable(variable_name: str) -> str:
    return os.environ.get(variable_name)


def get_environment_variables() -> dict:
    variables = {
        "BackendAPIUri": str,
        "BackendAPIKey": str
    }
    for variable in variables.keys():
        if read_environment_variable(variable) is not None:
            if variables[variable] == int:
                if read_environment_variable(variable).isnumeric():
                    variables[variable] = int(read_environment_variable(variable))
                else:
                    print(f"Variable \"{variable}\" need to be numeric")
                    exit(-1)
            elif variables[variable] == str:
                if len(read_environment_variable(variable)):
                    variables[variable] = read_environment_variable(variable)
                else:
                    print(f"Variable \"{variable}\" can't be empty")
                    exit(-1)
        else:
            print(f"Variable \"{variable}\" is required")
            exit(-1)
    return variables
