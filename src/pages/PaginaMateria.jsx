import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import HeaderMateria from "../components/HeaderMateria";
import AcoesRapidas from "../components/AcoesRapidas";
import ListaArquivos from "../components/ListaArquivos";
import FormularioAnotacao from "../components/FormularioAnotacao";
import DropdownArquivo from "../components/DropdownArquivo";
import ViewerEdicaoAnotacao from "../components/ViewerEdicaoAnotacao";
import { useToast } from "../components/useToast";
import "../css/PaginaMateria.css";

function novoId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function tipoArquivoPorNome(nome) {
  const ext = nome.split(".").pop()?.toLowerCase() || "";

  if (ext === "pdf") return "pdf";

  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
    return "imagem";
  }

  return "arquivo";
}

const PaginaMateria = () => {
  const { id } = useParams();
  const { mostrarToast, ToastEl } = useToast();

  const [nomeMateria] = useState(() => {
    try {
      const materias = JSON.parse(localStorage.getItem("materias") || "[]");
      const materia = materias.find((m) => String(m.id) === String(id));
      return materia?.nome || "Matéria";
    } catch {
      return "Matéria";
    }
  });

  const [itens, setItens] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(`materia:${id}:itens`) || "[]"
      );
    } catch {
      return [];
    }
  });

  const [busca, setBusca] = useState("");
  const [anotacaoAberta, setAnotacaoAberta] = useState(false);
  const [tituloAnotacao, setTituloAnotacao] = useState("");
  const [textoAnotacao, setTextoAnotacao] = useState("");
  const [dropdown, setDropdown] = useState(null);


  const inputArquivoRef = useRef(null);
  const formularioRef = useRef(null);

  const itensFiltrados = useMemo(() => {
    if (!busca.trim()) return itens;

    const q = busca.toLowerCase();

    return itens.filter((item) =>
      item.nome.toLowerCase().includes(q)
    );
  }, [itens, busca]);

  useEffect(() => {
    localStorage.setItem(
      `materia:${id}:itens`,
      JSON.stringify(itens)
    );
  }, [itens, id]);

  function abrirCriarAnotacao() {
    setTituloAnotacao("");
    setTextoAnotacao("");
    setAnotacaoAberta(true);

    setTimeout(() => {
      formularioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function salvarAnotacao() {
    const titulo = tituloAnotacao.trim();
    const texto = textoAnotacao.trim();

    if (!titulo) {
      alert("Dê um título para a anotação.");
      return;
    }

    setItens((prev) => [
      ...prev,
      {
        id: novoId(),
        tipo: "anotacao",
        nome: titulo,
        conteudo: texto,
        criadoEm: new Date().toISOString(),
      },
    ]);

    setAnotacaoAberta(false);
  }

  function abrirSeletorArquivo() {
    inputArquivoRef.current?.click();
  }

  function handleArquivosSelecionados(e) {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const novos = files.map((file) => ({
      id: novoId(),
      tipo: "arquivo",
      nome: file.name,
      tipoArquivo: tipoArquivoPorNome(file.name),
      url: URL.createObjectURL(file),
      criadoEm: new Date().toISOString(),
    }));

    setItens((prev) => [...prev, ...novos]);

    e.target.value = "";
  }

  function importarDrive() {
    mostrarToast("Google Drive ainda não está integrado.");
  }

  function importarNotion() {
    mostrarToast("Notion ainda não está integrado.");
  }

  function abrirDropdown(itemId, btnEl) {
    const rect = btnEl.getBoundingClientRect();

    setDropdown({
      id: itemId,
      top: rect.bottom + 6,
      left: Math.max(8, rect.left - 170 + rect.width),
    });
  }

  useEffect(() => {
    if (!dropdown) return;

    function fecharDropdown(e) {
      if (
        !e.target.closest(".dropdownMenu") &&
        !e.target.closest(".btnOpcoesArquivo")
      ) {
        setDropdown(null);
      }
    }

    document.addEventListener("click", fecharDropdown);

    return () => {
      document.removeEventListener("click", fecharDropdown);
    };
  }, [dropdown]);

  const [viewerItem, setViewerItem] = useState(null);

  function abrirViewer(item) {
    if (!item) return;

    setDropdown(null);
    setViewerItem(item);
  }

  function fecharViewer() {
    setViewerItem(null);
  }

  function salvarEdicaoViewer(novoTexto) {
    if (!viewerItem) return;

    setItens((prev) =>
      prev.map((item) =>
        item.id === viewerItem.id
          ? { ...item, conteudo: novoTexto }
          : item
      )
    );

    setViewerItem((item) => ({
      ...item,
      conteudo: novoTexto
    }));
  }

  function excluirItem(itemId) {
    setDropdown(null);

    const item = itens.find((i) => i.id === itemId);

    if (!item) return;

    if (
      !window.confirm(
        `Excluir "${item.nome}"? Essa ação não pode ser desfeita.`
      )
    ) {
      return;
    }

    setItens((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  }

  function baixarItem(itemId) {
    setDropdown(null);

    const item = itens.find((i) => i.id === itemId);

    if (!item) return;

    if (item.tipo === "arquivo" && item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.download = item.nome;
      a.click();

      return;
    }

    const blob = new Blob(
      [item.conteudo || ""],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.nome}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <main className="mx-auto w-full max-w-[1100px] flex-1 px-[18px] pt-[22px] pb-10 min-[900px]:px-11 min-[900px]:pt-10">

        <HeaderMateria
          nomeMateria={nomeMateria}
          busca={busca}
          setBusca={setBusca}
        />

        <AcoesRapidas
          abrirCriarAnotacao={abrirCriarAnotacao}
          abrirSeletorArquivo={abrirSeletorArquivo}
          importarDrive={importarDrive}
          importarNotion={importarNotion}
        />

        <input
          type="file"
          ref={inputArquivoRef}
          multiple
          accept="image/*,.pdf,.txt,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleArquivosSelecionados}
        />

        <ListaArquivos
          itens={itensFiltrados}
          abrirViewer={abrirViewer}
          abrirDropdown={abrirDropdown}
        />

        {anotacaoAberta && (
          <div ref={formularioRef} className="scroll-mt-24 min-[900px]:scroll-mt-6">
            <FormularioAnotacao
              tituloAnotacao={tituloAnotacao}
              textoAnotacao={textoAnotacao}
              setTituloAnotacao={setTituloAnotacao}
              setTextoAnotacao={setTextoAnotacao}
              cancelar={() => setAnotacaoAberta(false)}
              salvar={salvarAnotacao}
            />
          </div>
        )}
      </main>

      <DropdownArquivo
        dropdown={dropdown}
        itens={itens}
        abrirViewer={abrirViewer}
        baixarItem={baixarItem}
        excluirItem={excluirItem}
      />

      <ViewerEdicaoAnotacao
        item={viewerItem}
        onFechar={fecharViewer}
        onSalvar={salvarEdicaoViewer}
        onBaixar={baixarItem}
      />

      {ToastEl}
    </>
  );
};

export default PaginaMateria;