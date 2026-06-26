function iniciarSesion(){

    let usuario = document.getElementById("usuario").value.trim();

    let password = document.getElementById("password").value.trim();

    // Validar campos vacíos
    if(usuario === "" || password === ""){

        alert("Complete todos los campos.");
        return;
    }

    // Credenciales fijas
    const usuarioValido = "admin";
    const passwordValido = "admin123";

    // Validar usuario y contraseña
    if(usuario === usuarioValido && password === passwordValido){

        alert("Bienvenido " + usuario + ".");

        // Redireccionar al dashboard
        window.location.href = "dashboard.html";

    }else{

        alert("Usuario o contraseña incorrectos.");

        // Limpiar contraseña
        document.getElementById("password").value = "";

        // Colocar el cursor en el usuario
        document.getElementById("usuario").focus();
    }

}