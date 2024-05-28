from django.shortcuts import render, redirect

def redirect_to_dist_server(request):
    if request.user.is_authenticated and request.user.groups.filter(name='Удаленный доступ').exists():
        context = {}
        return render(request, "redirecting_dist_server.html", context)
    else:
        return redirect('http://127.0.0.1/signin/')
