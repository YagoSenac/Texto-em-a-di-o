document.addEventListener("submit", async (event) => {
    event.preventDefault();
 
    const fileInput = document.getElementById('audioFile');
    const audioFile = fileInput.files[0];
 
    if (!audioFile) {
        alert('Por favor, selecione um arquivo de áudio.');
        return;
    }
 
    const formData = new FormData();
    formData.append('audio', audioFile);
 
    try {
        const response = await fetch('http://127.0.0.1:8000/api/transcribe/', {
            method: 'POST',
            body: formData,
        });
 
        if (!response.ok) {
            throw new Error('Erro ao processar o arquivo. Tente novamente mais tarde.');
        }
 
        const data = await response.json();
        console.log(data)
        const transcriptionElement = document.getElementById('transcription');
        if (data.transcription) {
            transcriptionElement.textContent = data.transcription;
        } else {
            transcriptionElement.textContent = 'Erro: ' + (data.error || 'Não foi possível transcrever');
        }
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        document.getElementById('transcription').textContent = 'Erro ao enviar o arquivo: ' + error.message;
    }
});