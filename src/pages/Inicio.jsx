import { useState } from "react";
import FiltroAutores from "../components/FiltroAutores"
import FiltroGeneros from "../components/FiltroGeneros";
import Buscador from "../components/Buscador";
import Reproductor from "../components/Reproductor";
import ListadeCanciones from "../components/ListadeCanciones";
const Inicio = () => {
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [canciones, setCanciones] = useState([]); // Estado para la lista de canciones
    const [cancionActual, setCancionActual] = useState(null); // Estado para la canción actual
    const [isPlaying, setIsPlaying] = useState(false);
    const [filtro, setFiltro] = useState(""); // Estado para el filtro
    const [tipoFiltro, setTipoFiltro] = useState(""); // Estado para el tipo de filtro
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [titulo, setTitulo] = useState("");

    const handleAutorSelect = (nombre) => {
        setSearchTerm("");
        setAutor(nombre);
        setFiltro(nombre);
        setTipoFiltro("autor");
        setTitulo(` Canciones de la lista de ${nombre}`);
    };
    const handleGeneroSelect = (nombre) => {
        setSearchTerm("");
        setGenero(nombre);
        setFiltro(nombre);
        setTipoFiltro("genero");
        setTitulo(` Canciones del Genero ${nombre}`);
    };

    const handleCancionSelect = (genero, autor, titulo, interprete, url, coverImage	) => {
        const songExists = canciones.some(song => song.titulo === titulo && song.autor === autor);

        if (!songExists) {
            setCanciones(prev => [...prev, { genero, autor, titulo, interprete, url, coverImage	 }]);
            setCancionActual({ genero, autor, titulo, interprete, url, coverImage	 });
        } else {
            console.log("La canción ya existe en la lista."); // Opcional: Log o alerta al usuario
        }
    };

    const agregarTodas = (canciones) => {
        setCanciones(prev => [...prev, ...canciones]); // Agregar todas las canciones a la lista
    };
  return (
    <div className="container">
   
        <div className="pt-3 ">
             <FiltroAutores setAutor={handleAutorSelect} />
        </div>
        <div className="pt-3 ">
            <FiltroGeneros setGenero={handleGeneroSelect} />
        </div>
        <div className="pt-3 w-75 mx-auto">
        <Buscador  setSearchTerm={setSearchTerm}  searchTerm={searchTerm}/> 
        </div>
        <div className="text-center pt-3">{titulo}</div>
        <div className="py-3">
                <Reproductor 
                    canciones={canciones} 
                    setCanciones={setCanciones} // Asegúrate de que esto se pase
                    setCancionActual={setCancionActual} 
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                />
            </div>
            <div>
                <ListadeCanciones 
                    setCancion={handleCancionSelect} 
                    genero={genero} 
                    autor={autor} 
                    filtro={filtro} 
                    tipoFiltro={tipoFiltro} 
                    agregarTodo={agregarTodas}
                    searchTerm={searchTerm}
                    titulo={titulo} 
                />
            </div>

        
    </div>
  )
}

export default Inicio