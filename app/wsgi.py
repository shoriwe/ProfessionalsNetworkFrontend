from main import configure
from main import app

configure()

if __name__ == '__main__':
    app.run(port=5000)
