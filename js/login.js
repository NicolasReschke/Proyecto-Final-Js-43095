const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
pwShowHide = document.querySelectorAll(".pw_hide");
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));
document.querySelector("#ingresar").addEventListener("click", login);

function login(){
    var usuario = "";
    var password = "";
    var bAccess = false;
    
    usuario = document.querySelector("#usuario").value;
    console.log(usuario);
    password = document.querySelector("#password").value;
    console.log(password);
    
    bAccess = validarCredenciales (usuario, password);
    console.log(bAccess);

    if (bAccess == true){
        ingresar();
    } else {
        Swal.fire({
            title: 'Se produjo un error!',
            icon: 'warning',
            html: `Por favor, ingrese correctamente el usuario y la contraseña`,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Ok',
        });
    }
}

function ingresar() {
    var rol = sessionStorage.getItem("rolUsuarioActivo");
    console.log(rol);
    if (rol == 1) {
        Swal.fire('Iniciaste sesión como Admin');
        home.classList.remove("show");
    } else {
        Swal.fire('Iniciaste sesión como Cliente');
        home.classList.remove("show");
    }
}

pwShowHide.forEach((icon) => {
icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});
