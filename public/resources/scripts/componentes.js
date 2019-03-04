/* Recibe un valor booleano y un string con el id de un elemento html.
La función genera los botones de la barra de navegación */
function compBarNavegacion(sesionIniciada, elementoId) {
    let botones;
    
    if (sesionIniciada) {  
        botones = 
            `<a href="mis-planeaciones.html" class="enlace-boton">
                <button class="mdc-button mdc-button--raised bar-nav-boton">
                    <span class="mdc-button__label">Mis planeaciones</span>
                </button>
            </a>
            <a href="mis-etiquetas.html" class="enlace-boton">
                <button class="mdc-button mdc-button--raised bar-nav-boton">
                    <span class="mdc-button__label">Mis etiquetas</span>
                </button>
            </a>
            <button class="mdc-button mdc-button--raised bar-nav-boton" id="cerrarSesion">
                <span class="mdc-button__label">Cerrar sesión</span>
            </button>`;
    } else {
        botones =
            `<a href="iniciar-sesion.html" class="enlace-boton">
                <button class="mdc-button mdc-button--raised bar-nav-boton">
                    <span class="mdc-button__label">Iniciar sesión</span>
                </button>
            </a>
            <a href="registrar.html" class="enlace-boton">
                <button class="mdc-button mdc-button--raised bar-nav-boton">
                    <span class="mdc-button__label">Registrarse</span>
                </button>
            </a>`;
    }

    $("#"+elementoId).html(botones);
}

/* Recibe un conjunto de documentos de la BD y un string con el id de un lista.
La función genera una lista de colectas, planeaciones o etiquetas */
function compItemsListaResultados(documentos, listaId) {
    let itemsLista = "";
    
    if(listaId === "index-listaRes") {
        documentos.forEach(function(doc) {
            itemsLista += 
                `<li id="`+ doc.id +`">
                    <div class="mdc-card mdc-card--outlined">
                        <div class="mdc-card__primary-action lista-resultados-item">
                            <span class="mdc-list-item__text">
                                <p class="mdc-typography--body1 h7">`+ doc.data().titulo +`</p>
                                <p class="mdc-typography--body2">`+ doc.data().lugar +`</p>
                                <p class="mdc-typography--body2">`+ doc.data().fecha +`</p>
                            </span>
                        </div>
                    </div>
                </li>`;
        });
    } else {
        documentos.forEach(function(doc) {
            let tituloIcono;
            let icono;

            if(doc.data().publico) {
                tituloIcono = "Información pública";
                icono = "public";
            } else {
                tituloIcono = "Información privada";
                icono = "person";
            }

            itemsLista +=
                `<li id="`+ doc.id +`">
                    <div class="mdc-card mdc-card--outlined">
                        <div class="mdc-card__primary-action lista-resultados-item">
                            <span class="mdc-list-item__text">
                                <p class="mdc-typography--body1 h7">`+ doc.data().titulo +`</p>
                                <p class="mdc-typography--body2">`+ doc.data().lugar +`</p>
                                <p class="mdc-typography--body2">`+ doc.data().fecha +`</p>
                            </span>
                        </div>
                        <div class="mdc-card__actions">
                            <div class="mdc-card__action-buttons">
                                <button class="mdc-button  mdc-card__action mdc-card__action--button" id="eliminar-itemListaRes">
                                    <i class="material-icons mdc-button__icon">delete</i>
                                    <span class="mdc-button__label">Eliminar</span>
                                </button>
                            </div>
                            <div class="mdc-card__action-icons">
                                <i class="material-icons mdc-button__icon" title="`+ tituloIcono +`">`+ icono +`</i>
                            </div>
                        </div>
                    </div>
                </li>`;
        });
    }
    $("#"+listaId).append(itemsLista);
}

/* Recibe el nombre del item y el id de una lista */
function compItemListaIcono(item, listaId) {
    const itemLista =
    `<li>
        <div class="mdc-list-item">
            <span class="mdc-list-item__text" title="`+ item +`">`+ item +`</span>
        </div>
        <button class="mdc-icon-button material-icons" title="Eliminar" id="eliminar-itemListaIcono">delete</button>
    </li>
    <li class="mdc-list-divider"></li>`
    $("#"+listaId).append(itemLista);
}

function compFormatoPlaneacion(doc) {
    const encabezado =
        `<h5 class="mdc-typography--headline5">`+ doc.titulo +`</h5>
        <p class="mdc-typography--body2">`+ doc.participantes.length +` colectores</p>`;

    let listaMaterial; 
    if(doc["material-campo"].length) {
        listaMaterial = "<ul>";
        for(index in doc["material-campo"]) {
            listaMaterial += "<li>"+doc["material-campo"][index]+"</li>";  
        }
        listaMaterial += "</ul>";
    }

    let listaInfo;
    if(doc["info-consulta"].length) {
        listaInfo = "<ul>";
        for(index in doc["info-consulta"]) {
            listaInfo += "<li>"+doc["info-consulta"][index]+"</li>";  
        }
        listaInfo += "</ul>";
    }

    const nombreCampo = ["Responsable", "Objetivo", "Tipo de colecta", "Fecha de colecta", 
    "Lugar de colecta", "Especies de interés", "Material de campo", 
    "Información de consulta","Información adicional"];
    const indices = ["responsable", "objetivo", "tipo", "fecha", "lugar", 
        "especies", "material-campo", "info-consulta","info-adicional"];
    let formato = "";
    
    for(let i = 0; i < indices.length; i++) {
        let valorCampo = doc[indices[i]]; 

        if(nombreCampo[i] === "Material de campo") {
            valorCampo = listaMaterial;
        }
        if(nombreCampo[i] === "Información de consulta") {
            valorCampo = listaInfo;
        }
        if(valorCampo === "" || valorCampo == null) {
            valorCampo = "No hay información disponible.";
        }

        formato += 
            `<li>
                <p class="mdc-typography--body1 h7">`+ nombreCampo[i]  +`</p>
                <p class="mdc-typography--body1 texto-info">` + valorCampo + `</p>
            </li>`;
    }

    $(".encabezado-section").html(encabezado);
    $(".lista-info-consulta").html(formato);
}

function compSelectColector(doc){
    const encabezado =
        `<h5 class="mdc-typography--headline5">`+ doc.data().titulo +`</h5>
        <p class="mdc-typography--body2">`+ doc.data().participantes.length +` colectores</p>`;
    
    const participantes = doc.data().participantes;
    for(index in participantes) {
        const idUsuario = participantes[index]["id_usuario"];
        const nombreUsuario = participantes[index]["nombre_usuario"];

        $("#ce-nombreColector").append(`<option value="`+ idUsuario +`">`+ nombreUsuario +`</option>`);
    }

    $(".encabezado-section").html(encabezado);
}

function compItemsListaEtiquetas(docs) {
    if(docs.size) {
        docs.forEach(function(doc) {
            const nombrePlanta = doc.data().nombre_comun;
            const etiquetaId = doc.data().id;
            $("#ce-listaItems").append(
                `<li id="`+ etiquetaId  +`">
                    <div class="mdc-list-item">
                        <span class="mdc-list-item__text" title="`+ nombrePlanta +`">`+ nombrePlanta +`</span>
                    </div>
                    <button class="mdc-icon-button material-icons" title="Ver etiqueta">picture_as_pdf</button>
                    <button class="mdc-icon-button material-icons" title="Ver fotografías">photo_library</button>
                </li>
                <li class="mdc-list-divider"></li>`);
        });
    } else {
        $("#lista-etiquetas").append(
            `<li id="mensaje-default">
                <p class="mdc-typography--body1 cont-mensaje">No se encontraron resultados.</p>
            </li>`);
    }
}