from django.http import JsonResponse


def error_404(request, exception):
    return JsonResponse({'error': 'URL no encontrada'}, status=404)
