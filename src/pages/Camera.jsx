import { useEffect, useRef, useState } from "react";
const Tesseract = await import("tesseract.js");
import CameraHeader from "../components/CameraHeader";
import CameraDropdown from "../components/CameraDropdown";
import CameraZoom from "../components/CameraZoom";
import CameraControls from "../components/CameraControls";
import CameraOverlay from "../components/CameraOverlay";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraErro, setCameraErro] = useState("");
  const [resultado, setResultado] = useState("");
  const [processando, setProcessando] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [materiaSelecionada, setMateriaSelecionada] = useState(false);
  const [overlayAberto, setOverlayAberto] = useState(false);

  useEffect(() => {
    let stream;

    const configurarCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (erro) {
        console.error(erro);
        setCameraErro(`Erro ao acessar a câmera: ${erro.message}`);
      }
    };

    configurarCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const escanearTexto = async () => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    setProcessando(true);
    setCameraErro("");
    setResultado("Fazendo a leitura... aguarde");

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.filter = "contrast(1.3) grayscale(1)";
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const { data } = await Tesseract.recognize(canvas, "por");
      const textoFinal = data.text.trim();

      if (textoFinal.length > 0) {
        setResultado(textoFinal);
      } else {
        setResultado("Não foi possível identificar o texto");
      }
    } catch (erro) {
      console.error(erro);
      setResultado(`Erro ao processar: ${erro.message}`);
    } finally {
      setProcessando(false);
    }
  };

  const abrirDropdown = () => {
    setDropdownAberto((estadoAtual) => !estadoAtual);
  };

  const selecionarMateria = () => {
    setMateriaSelecionada(true);
    setDropdownAberto(false);
  };

  const abrirOverlay = () => {
    setOverlayAberto(true);
  };

  const fecharOverlay = () => {
    setOverlayAberto(false);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-stretch">
      <div className="w-full max-w-[430px] h-full mx-auto flex flex-col bg-black overflow-hidden">
        <CameraHeader onLogoClick={abrirDropdown} />

        <div className="relative w-full flex-1 bg-black overflow-hidden min-h-0">
          <CameraDropdown aberto={dropdownAberto} onSelecionarMateria={selecionarMateria} />

          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover block" />
          <canvas ref={canvasRef} className="hidden" />

          <CameraZoom />

          {(resultado || cameraErro) && (
            <div className="absolute bottom-[70px] left-4 right-4 max-h-[35%] overflow-y-auto bg-[rgba(0,0,0,0.72)] backdrop-blur-[8px] p-4 rounded-[14px] text-[0.9rem] leading-normal whitespace-pre-wrap z-20">
              {cameraErro || resultado}
            </div>
          )}

          {materiaSelecionada && (
            <button
              className="absolute bottom-[70px] right-6 w-[52px] h-[52px] border-none rounded-full bg-[#00c853] text-white text-[1.3rem] cursor-pointer z-[90] flex items-center justify-center shadow-[0_8px_20px_rgba(0,200,83,0.4)] transition-transform duration-200 hover:scale-[1.08] active:scale-95"
              onClick={abrirOverlay}
            >
              ✔
            </button>
          )}
        </div>

        <CameraControls onScan={escanearTexto} processando={processando} />
        <CameraOverlay aberto={overlayAberto} onCancelar={fecharOverlay} />
      </div>
    </div>
  );
};

export default Camera;