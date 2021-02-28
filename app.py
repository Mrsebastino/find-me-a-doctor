from flask import Flask, render_template, url_for, request

import os


app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")


@app.route('/booking_form', methods=['GET', 'POST'])
def booking_form():
    if request.method == 'POST':
        return render_template("booking_form.html")


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
