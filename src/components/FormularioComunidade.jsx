import { useRef, useState } from "react";
import Modal from "./Modal";

const rotulo = "text-sm font-semibold text-[#333]";

const FormularioComunidade = () => ({ comunidade, onFechar, onSalvar }) => {
  const edicao = !!comunidade;
  const [form, setForm] = useState({
    nome: comunidade?.nome || "",
    descricao: comunidade?.descricao || "",
    categoria: comunidade?.categoria || "Estudo",
    privacidade: comunidade?.privacidade || "Pública",
  });
  const [foto, setFoto] = useState(comunidade?.foto || null);
  const inputFoto = useRef(null);

  const mudar = (nome) => (e) => setForm({ ...form, [nome]: e.target.value });

  function escolherFoto(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = (ev) => setFoto(ev.target.result);
    leitor.readAsDataURL(arquivo);
  }

  function enviar(e) {
    e.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
    onSalvar({ ...form, nome: form.nome.trim(), descricao: form.descricao.trim(), foto });
  }

  return (
    <Modal onFechar={onFechar}>
      <form onSubmit={enviar} className="flex flex-col gap-3">
        <h2 className="mb-2 text-xl font-bold">{edicao ? "Editar Comunidade" : "Nova Comunidade"}</h2>

        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={() => inputFoto.current.click()}
            className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#1466ff] bg-[#e8efff] text-[32px] transition hover:bg-[#d0e0ff]"
          >
            {foto ? <img src={foto} alt="foto da comunidade" className="h-full w-full object-cover" /> : "📷"}
          </button>
          <input ref={inputFoto} type="file" accept="image/*" className="hidden" onChange={escolherFoto} />
          <button type="button" onClick={() => inputFoto.current.click()} className="text-[13px] font-semibold text-[#1466ff]">
            Adicionar foto da comunidade
          </button>
        </div>

        <label className="text-sm font-semibold text-[#333]" htmlFor="nomeComunidade">Nome da Comunidade:</label>
        <input id="nomeComunidade" className="rounded-lg border border-[#ccc] p-2.5 text-sm" placeholder="Ex. Cálculo" value={form.nome} onChange={mudar("nome")} />

        <label className="text-sm font-semibold text-[#333]" htmlFor="descricao">Descrição:</label>
        <input id="descricao" className="rounded-lg border border-[#ccc] p-2.5 text-sm" placeholder="Descreva o objetivo da comunidade..." value={form.descricao} onChange={mudar("descricao")} />

        <label className="text-sm font-semibold text-[#333]" htmlFor="categoria">Categoria:</label>
        <select id="categoria" className="rounded-lg border border-[#ccc] p-2.5 text-sm" value={form.categoria} onChange={mudar("categoria")}>
          {["Estudo", "Projeto", "Discussão", "Tutoria", "Social"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label className="text-sm font-semibold text-[#333]" htmlFor="privacidade">Privacidade:</label>
        <select id="privacidade" className="rounded-lg border border-[#ccc] p-2.5 text-sm" value={form.privacidade} onChange={mudar("privacidade")}>
          <option>Pública</option>
          <option>Privada</option>
        </select>

        <button type="submit" className="mt-3 rounded-lg bg-[#1466ff] px-4 py-2.5 text-white">
          {edicao ? "Salvar alterações" : "Criar comunidade"}
        </button>
      </form>
    </Modal>
  );
}
export default FormularioComunidade
