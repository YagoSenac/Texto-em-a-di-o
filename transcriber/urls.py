from django.urls import path
from .views import AudioTranscriptionView
from . import views

urlpatterns = [
    path('transcribe/', AudioTranscriptionView.as_view(), name='audio-transcribe'),
]