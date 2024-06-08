from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from .forms import RegisterForm
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView, PasswordResetCompleteView, PasswordResetDoneView
import json


def login_view(request):
    if request.method == "GET":
        return redirect('http://127.0.0.1/signin')
    elif request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body["username"]
        password = body["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'Authorization': 'Success'}, status=200)
        else:
            return JsonResponse({'Authorization': 'Unauthorized'}, status=401)


def logout_view(request):
    if request.method == "GET":
        return redirect('http://127.0.0.1/logout')
    elif request.method == "POST":
        logout(request)
        return JsonResponse({'Authorization': 'Success'}, status=200)


def sign_up(request):
    if request.method == 'GET':
        context = {}
        return render(request, "index.html", context)
    elif request.method == 'POST':
        try:
            form = RegisterForm(request.POST)
            if form.is_valid():
                user = form.save()
                login(request, user)
                return JsonResponse({'message': 'Success'}, status=200)
            else:
                errorlist = []
                form = str(form)
                while form.find('<li>') != -1:
                    form = form[form.find('<li>')+4:]
                    errorlist.append(form[:form.find('</li>')])
                context = {'error': json.dumps(errorlist)}
                return JsonResponse(context, status=200)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
    return HttpResponse(status=405)



class PasswordReset(PasswordResetView):
    template_name = 'password_reset.html'
    email_template_name = 'password_reset_email.html'
    subject_template_name = 'password_reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."


class PasswordResetConfirm(PasswordResetConfirmView):
    template_name = 'password_reset_confirm.html'



class PasswordResetComplete(PasswordResetCompleteView):
    template_name = 'password_reset_complete.html'


class PasswordResetDone(PasswordResetDoneView):
    template_name = 'password_reset_done.html'



# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)
