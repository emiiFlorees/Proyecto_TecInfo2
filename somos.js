document.getElementById("btnPresentacion").addEventListener("click", function() {
    window.open("https://www.canva.com/presentacion-id", "_blank");
});
document.getElementById("btnSonido").addEventListener("click", function() {
    let audio = document.getElementById("audioAmbiente");
    
    if (audio.paused) {
        audio.play();
        this.textContent = "Desactivar sonido";
    } else {
        audio.pause();
        this.textContent = "Activar sonido";
    }
});
