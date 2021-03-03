from flask import Flask, render_template, url_for, request, redirect

import os


app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    """Return the home page"""
    return render_template("index.html")


@app.route('/booking_form')
def booking_form():
    """Return the booking form page"""
    return render_template("booking_form.html")


@app.route('/appointment_booked', methods=["GET", "POST"])
def appointment_booked():
    """Load data from the form and returned confirmation to user"""
    if request.method == "POST":
        req = request.form
        fullname = req.get("fullname")
        email = req.get("email")
        date = req.get("date")
        time = req.get("time")
    return render_template("appointment_booked.html", req=req)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP', "0.0.0.0"),
            port=int(os.environ.get('PORT', "8080")),
            debug=True)
