from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
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


def redirect_to_server(request):
    # Redirect to an external URL
    return redirect('http://127.0.0.1:3000/wetty')


# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)
