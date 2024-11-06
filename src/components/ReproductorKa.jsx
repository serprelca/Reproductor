import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
const ReproductorKa = ({ canciones, setCanciones, setCancionActual, isPlaying, setIsPlaying }) => {
    const [index, setIndex] = useState(0);
    const [duration, setDuration] = useState(0); // Duración total de la canción
    const [currentTime, setCurrentTime] = useState(0); // Tiempo actual de la canción

    useEffect(() => {
        if (canciones.length > 0) {
            setCancionActual(canciones[index]);
        }
    }, [index, canciones, setCancionActual]);

    const changeSong = (direction) => {
        if (direction === 'next' && index < canciones.length - 1) {
            setIndex(index + 1);
        } else if (direction === 'prev' && index > 0) {
            setIndex(index - 1);
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);

    };

    const limpiarLista = () => {
        setCanciones([]);
        setDuration(0);
        setCancionActual(null);
        setIsPlaying(false);
    };

    return (
        <div className="container">
            <div className='row '>
                
                <div className='col-md-3 text-start card reproductorKa' data-bs-theme="dark">
                    <p className='text-center my-2 fw-bold'>Lista de Reproducción ({canciones.length})</p>
                    {canciones && canciones.length > 0 && canciones.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: idx === index ? '#e67e22' : 'transparent',
                                padding: '4px 8px',
                                borderRadius: '5px',
                            }}
                        >
                            {item.titulo.toLowerCase().substring(0, 20)}
                        </div>
                    ))}
                </div>
                <div className='col-md-9 card reproductorKa' data-bs-theme="dark">

                  
               

          
                       
                        {canciones.length > 0 && (
                             
                             <ReactPlayer
                             url={canciones[index].url} // Asegúrate de que esta URL sea un video de Karaoke
                             playing={isPlaying}
                             onEnded={() => changeSong('next')}
                             onProgress={handleProgress}
                             onDuration={handleDuration}
                             width="100%" // Ajusta el ancho al 100%
                             height="100%" // Ajusta la altura al 100%
                             style={{ maxHeight: '500px' }} // Limita la altura si es necesario
                             controls={true} // Habilita los controles del reproductor, incluyendo pantalla completa
                         />
                            
                        )}
                        <div className="d-flex flex-column align-items-center">
                            <input
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeekChange}
                                className="progress-bar"
                                style={{ width: '80%', margin: '4px 0' }}
                            />
                            <div>
                                <button className='btn btn-outline-warning btn-sm mx-1' onClick={() => changeSong('prev')}><IoPlaySkipBack /></button>
                                <button className='btn btn-outline-warning btn-sm mx-1' onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                                <button className='btn btn-outline-warning btn-sm mx-1' onClick={() => changeSong('next')}><IoPlaySkipForward /></button>
                                <button className='btn btn-outline-danger btn-sm m-1' onClick={limpiarLista}>Limpiar Lista</button>
                            </div>
                        </div>


                    </div>
                    </div>
              
        </div>
    );
};

export default ReproductorKa;