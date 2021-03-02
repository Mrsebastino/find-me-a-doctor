from flask import Flask, render_template, url_for, request

import os


app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")


@app.route('/booking_form')
def booking_form():
    return render_template("booking_form.html")


@app.route('/appointment_booked')
def appointment_booked():
    return render_template("appointment_booked.html")


if __name__ == '__main__':
    app.run(host=os.environ.get('IP', "0.0.0.0"),
            port=int(os.environ.get('PORT', "8080")),
            debug=True)
