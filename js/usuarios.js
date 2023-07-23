function obtenerListaUsuarios() {
    var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarioLs'));

    if (listaUsuarios == null) {
        listaUsuarios = 
        [
            ["1","admin@admin","admin", "nombreAdmin", "apellidoAdmin"],
            ["2","cliente@cliente","cliente", "nombreCliente", "apellidoCliente"]
        ]
    }
    return listaUsuarios;
}

function validarCredenciales(pUsuario , pPassword) {
    var listaUsuarios = obtenerListaUsuarios();
    var bAccess = false;

    for (var i = 0; i < listaUsuarios.length; i++){
        if(pUsuario == listaUsuarios [i][1] && pPassword == listaUsuarios[i][2]) {
            bAccess = true;
            sessionStorage.setItem("rolUsuarioActivo", listaUsuarios[i][0]);
        }
    }
    return bAccess;
}
