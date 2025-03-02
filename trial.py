from flask import Flask 

app = Flask(__name__)

@app.route('/what')
def hello():
    return 'Hello, World!'

app.run()