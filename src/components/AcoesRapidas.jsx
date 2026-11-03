import logoGoogle from "../assets/google-logo.png";
import logoNotion from "../assets/Notion-Logo.png";

// Mobile (< 700px): grade de 2 colunas, com descrição e seta visíveis.
// Desktop: 4 colunas, como antes.
const classeCard =
  "relative flex min-h-[238px] flex-col items-start overflow-hidden rounded-[22px] border border-[#e8ebf3] bg-white px-[18px] pb-[18px] pt-[22px] text-left text-[#101b4d] shadow-[0_8px_24px_rgba(18,42,110,0.07)] transition-[transform,box-shadow,border-color] duration-200 ease-in-out hover:-translate-y-1 hover:border-[#d8e2ff] hover:shadow-[0_14px_30px_rgba(20,92,255,0.12)] max-[699px]:min-h-[200px] max-[699px]:rounded-[18px] max-[699px]:px-[14px] max-[699px]:pb-[14px] max-[699px]:pt-[18px]";

const classeIcone =
  "mb-[22px] flex h-[58px] w-[58px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#edf3ff] text-[#145cff] max-[699px]:mb-4 max-[699px]:h-[50px] max-[699px]:w-[50px]";

const classeTitulo = "font-extrabold max-[699px]:text-[15px]";

const classeDescricao =
  "mt-[12px] text-[14px] leading-[1.45] text-[#73798d] max-[699px]:mt-2 max-[699px]:text-[13px]";

const classeSeta =
  "ml-auto mt-auto flex h-[36px] w-[42px] items-center justify-center rounded-[13px] bg-[#edf3ff] text-[25px] leading-none text-[#145cff] max-[699px]:h-[32px] max-[699px]:w-[38px] max-[699px]:text-[22px]";

const AcoesRapidas = ({ abrirCriarAnotacao, abrirSeletorArquivo, importarDrive, importarNotion }) => {
  return (
    <>
      <section className="mt-[34px] max-[699px]:mt-[30px]">
        <h2 className="mb-[18px] text-[21px] font-extrabold tracking-[-0.4px] text-[#101b4d] max-[699px]:text-[19px]">
          Ações Rápidas
        </h2>

        <div className="grid grid-cols-2 gap-[14px] min-[700px]:grid-cols-4">
          <button aria-label="Anotações" className={classeCard} onClick={abrirCriarAnotacao}>
            <span className={classeIcone}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </span>
            <strong className={classeTitulo}>Anotações</strong>
            <span className={classeDescricao}>Crie e organize <br />suas ideias</span>
            <span className={classeSeta}>→</span>
          </button>

          <button aria-label="Enviar arquivo" className={classeCard} onClick={abrirSeletorArquivo}>
            <span className={classeIcone}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <strong className={classeTitulo}>Enviar arquivo</strong>
            <span className={classeDescricao}>Envie arquivos do <br />seu dispositivo</span>
            <span className={classeSeta}>→</span>
          </button>

          <button aria-label="Google Drive" className={classeCard} onClick={importarDrive}>
            <span className={classeIcone}>
              <img src={logoGoogle} alt="" className="!block !h-[50px] !w-[50px] !max-h-[50px] !max-w-[50px] !shrink-0 !object-contain max-[699px]:!h-[42px] max-[699px]:!w-[42px] max-[699px]:!max-h-[42px] max-[699px]:!max-w-[42px]" />
            </span>
            <strong className={classeTitulo}>Google Drive</strong>
            <span className={classeDescricao}>Importe arquivos <br />do Drive</span>
            <span className={classeSeta}>→</span>
          </button>

          <button aria-label="Notion" className={classeCard} onClick={importarNotion}>
            <span className={classeIcone}>
              <img src={logoNotion} alt="" className="!block !h-[40px] !w-auto !max-w-none !shrink-0 max-[699px]:!h-[34px]" />
            </span>
            <strong className={classeTitulo}>Notion</strong>
            <span className={classeDescricao}>Importe arquivos <br />do Notion</span>
            <span className={classeSeta}>→</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default AcoesRapidas;
