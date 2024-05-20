from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView, PasswordResetCompleteView, PasswordResetDoneView
import json


def login_view(request):
    if request.method == "GET":
        context = {}
        return render(request, "index.html", context)
    elif request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body["username"]
        password = body["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(headers={'Authorization': 'Success'}, status=200)
        else:
            return HttpResponse(headers={'Authorization': 'Unauthorized'}, status=401)


def logout_view(request):
    if request.method == "GET":
        context = {}
        return render(request, "index.html", context)
    elif request.method == "POST":
        logout(request)
        return HttpResponse(headers={'Authorization': 'Success'}, code=200)


class SignUp(CreateView):
    form_class = UserCreationForm
    template_name = "signup.html"


class PasswordReset(PasswordResetView):
    template_name = 'password_reset.html'
    email_template_name = 'password_reset_email.html'
    subject_template_name = 'password_reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    #success_url = reverse_lazy('account:password_reset_done')


class PasswordResetConfirm(PasswordResetConfirmView):
    template_name = 'password_reset_confirm.html'

class PasswordResetComplete(PasswordResetCompleteView):
    template_name = 'password_reset_complete.html'


class PasswordResetDone(PasswordResetDoneView):
    template_name = 'password_reset_done.html'


def redirect_to_dist_serv(request):
    # Redirect to an external URL
    return redirect('http://127.0.0.1:3000/wetty')


# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)
