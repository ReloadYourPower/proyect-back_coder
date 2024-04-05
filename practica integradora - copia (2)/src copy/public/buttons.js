// Función para redirigir a la vista de realTimeProducts
function goToRealTimeProducts() {
    console.log("Redirigiendo a la vista realTimeProducts");
    window.location.href = '/realTimeRoute'; // Ruta de la vista de realTimeProducts
}

// Obtén el botón por su clase
const button = document.querySelector(".but-view");

// Agrega un evento de clic al botón para llamar a la función goToRealTimeProducts
button.addEventListener("click", () =>{
    console.log("hiciste click en el boton");
    goToRealTimeProducts(); // Llama a la función para redirigir
});


