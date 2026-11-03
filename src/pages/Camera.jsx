import { useEffect, useRef, useState } from "react";
const Tesseract = await import("tesseract.js");
import CameraHeader from "../components/CameraHeader";
import CameraDropdown from "../components/CameraDropdown";
import CameraZoom from "../components/CameraZoom";
import CameraControls from "../components/CameraControls";
import CameraOverlay from "../components/CameraOverlay";

// Gera uma foto colorida (JPEG) do quadro atual do vídeo, limitada a 1280px
// para não estourar o limite do localStorage.
function capturarFoto(video) {
  const largura = video.videoWidth || 640;
  const altura = video.videoHeight || 480;
  const escala = Math.min(1, 1280 / Math.max(largura, altura));

  const c = document.createElement("canvas");
  c.width = Math.round(largura * escala);
  c.height = Math.round(altura * escala);
  c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);

  return c.toDataURL("image/jpeg", 0.8);
}

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraErro, setCameraErro] = useState("");
  const [resultado, setResultado] = useState("");
  const [processando, setProcessando] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  // Agora guarda a matéria escolhida (objeto {id, nome, ...}) em vez de true/false
  const [materiaSelecionada, setMateriaSelecionada] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
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

    // Foto colorida que será salva na matéria (o canvas abaixo é só para o OCR)
    setFotoCapturada(capturarFoto(video));

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

  const selecionarMateria = (materia) => {
    setMateriaSelecionada(materia);
    setDropdownAberto(false);
  };

  const abrirOverlay = () => {
    setOverlayAberto(true);
  };

  const fecharOverlay = () => {
    setOverlayAberto(false);
  };

  // Grava a foto na lista da matéria, no mesmo formato que PaginaMateria lê
  // (chave `materia:<id>:itens`). Lê o localStorage na hora para não sobrescrever
  // itens que já existem.
  const salvarFoto = (nome) => {
    if (!materiaSelecionada || !fotoCapturada) {
      return false;
    }

    const chave = `materia:${materiaSelecionada.id}:itens`;
    const nomeFinal = `${nome.replace(/\.(jpe?g)$/i, "")}.jpg`;

    try {
      const salvos = JSON.parse(localStorage.getItem(chave) || "[]");
      const lista = Array.isArray(salvos) ? salvos : [];

      lista.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        tipo: "arquivo",
        nome: nomeFinal,
        tipoArquivo: "imagem",
        url: fotoCapturada,
        criadoEm: new Date().toISOString(),
      });

      localStorage.setItem(chave, JSON.stringify(lista));
      return true;
    } catch (erro) {
      console.error(erro);
      return false;
    }
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

          {materiaSelecionada && fotoCapturada && (
            <button
              className="absolute bottom-[70px] right-6 w-[52px] h-[52px] border-none rounded-full bg-[#00c853] text-white text-[1.3rem] cursor-pointer z-[90] flex items-center justify-center shadow-[0_8px_20px_rgba(0,200,83,0.4)] transition-transform duration-200 hover:scale-[1.08] active:scale-95"
              onClick={abrirOverlay}
            >
              ✔
            </button>
          )}
        </div>

        <CameraControls onScan={escanearTexto} processando={processando} />
        <CameraOverlay aberto={overlayAberto} onCancelar={fecharOverlay} onSalvar={salvarFoto} />
      </div>
    </div>
  );
};

export default Camera;
