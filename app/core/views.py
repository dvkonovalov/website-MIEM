from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate


def login_view(request):
    print('\n\n\nTUT\n\n\n')
    if request.method == "GET":
        context = {}
        return render(request, "index.html", context)
    elif request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('Success', code=200)
        else:
            HttpResponse('Unauthorized', code=401)


def logout_view(request):
    if request.method == "GET":
        context = {}
        return render(request, "index.html", context)
    elif request.method == "POST":
        logout(request)
        return HttpResponse('Success', code=200)

def redirect_to_server(request):
    # Redirect to an external URL
    return redirect('http://127.0.0.1:3000/wetty')


# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)
