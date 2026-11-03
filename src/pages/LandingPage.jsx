import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/landing/logo.jpeg";
import telaInicial from "../assets/landing/inicial_JC.PNG";
import telaMaterias from "../assets/landing/materias_JC.PNG";
import telaCalendario from "../assets/landing/calendario_JC.PNG";
import telaCamera from "../assets/landing/camera_JC.PNG";
import telaPerfil from "../assets/landing/perfil.PNG";
import telaPaginaMateria from "../assets/landing/paginaMateria.PNG";
import amanda from "../assets/landing/amanda.jpeg";
import giovanna from "../assets/landing/giovanna.jpeg";
import leticia from "../assets/landing/leticia3.jpeg";
import nayra from "../assets/landing/nayra.jpeg";
import paloma from "../assets/landing/paloma.jpeg";

const MENU = [
  { id: "solucao", label: "A Solução" },
  { id: "publico", label: "Público-Alvo" },
  { id: "galeria", label: "Galeria" },
  { id: "equipe", label: "Nossa Equipe" },
  { id: "contato", label: "Contato" },
];

const FUNCIONALIDADES = [
  {
    titulo: "Capture",
    texto: "Registre aulas, exercícios, anotações e conteúdos importantes com a câmera.",
  },
  {
    titulo: "Organize",
    texto: "Separe suas imagens por matérias e mantenha tudo em seu devido lugar.",
  },
  {
    titulo: "Transforme",
    texto: "Reúna seus conteúdos e transforme suas fotos em arquivos como PDF, JPG ou DOCX.",
  },
  {
    titulo: "Compartilhe",
    texto: "Interaja com outros estudantes e compartilhe conhecimentos por meio das comunidades.",
  },
];

const PERFIS_PUBLICO = [
  "Utilizam o celular frequentemente para estudar e registrar conteúdos.",
  "Fotografam lousas, livros, exercícios, trabalhos e anotações.",
  "Têm dificuldade para encontrar posteriormente uma foto ou informação específica.",
  "Precisam conciliar estudos, trabalhos, provas e outras atividades.",
];

const GALERIA = [
  {
    img: telaCamera,
    alt: "Câmera do JoviClass habilitada para iniciar o fluxo de estudos",
    legenda: "Câmera JOVI com o JoviClass habilitado para começar o fluxo",
  },
  {
    img: telaPerfil,
    alt: "Tela de perfil do usuário",
    legenda: "Tela de perfil do usuário, onde ele pode editar suas informações.",
  },
  {
    img: telaPaginaMateria,
    alt: "Página da matéria do aluno",
    legenda: "Página da matéria do aluno, onde vai estar todo o seu conteúdo.",
  },
];

const PROJETO = [
  {
    href: "/home",
    texto: "Clique para ser direcionado para nossa plataforma",
    img: logo,
    alt: "Logo do JoviClass",
  },
];

const EQUIPE = [
  { nome: "Amanda Lourenço", foto: amanda, cargo: "Desenvolvimento de Sistemas e Estudante de Engenharia de Software" },
  { nome: "Giovanna Scalzone", foto: giovanna, cargo: "Técnica de Informática e Estudante de Engenharia de Software" },
  { nome: "Letícia Brandão", foto: leticia, cargo: "Desenvolvimento de Software e Estudante de Engenharia de Software" },
  { nome: "Nayra Duarte", foto: nayra, cargo: "Desenvolvimento de Sistemas e Estudante de Engenharia de Software" },
  { nome: "Paloma Dantas", foto: paloma, cargo: "Técnica de Informática e Estudante de Engenharia de Software" },
];

const container = "mx-auto w-[min(600px,92%)] md:w-[min(1120px,90%)]";
const secao = "scroll-mt-20 py-20 min-[900px]:py-[110px]";
const tituloBloco = "mx-auto mb-[55px] max-w-[700px] text-center";
const tituloH2 = "mb-[18px] text-[32px] font-bold leading-[1.1] text-[#071a35] min-[561px]:text-[40px] lg:text-[50px] [&_span]:text-[#155eef]";
const tituloP = "font-black text-[#0c4fd7]";
const btn = "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[9px] px-[22px] text-sm font-bold transition duration-300";
const btnPrimario = `${btn} border border-[#155eef] bg-[#155eef] text-white shadow-[0_10px_25px_rgba(21,94,239,0.2)] hover:-translate-y-0.5 hover:bg-[#0c4fd7]`;
const btnSecundario = `${btn} border border-[#0031d1] bg-white text-[#14213d] hover:border-[#155eef] hover:text-[#155eef]`;
const cardAzul = "rounded-[20px] border border-[#0031d1] bg-[#f3f7ff]";
const logoLink = "flex items-center gap-2 text-lg font-extrabold min-[381px]:text-[21px]";
const logoBox = "grid size-[34px] place-items-center overflow-hidden rounded-[9px] bg-[#155eef] text-white";
const printMobile = "rounded-[30px] border-[6px] border-[#14213d] bg-white object-contain";

export default function LandingPage({ rotaApp = "/home" }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const irPara = (id) => (evento) => {
    evento.preventDefault();
    setMenuAberto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enviarContato = (evento) => {
    evento.preventDefault();
    alert("Mensagem enviada! Obrigado por entrar em contato com o JoviClass.");
    evento.currentTarget.reset();
  };

  return (
    <div className="overflow-x-clip bg-white font-[family-name:Lexend,sans-serif] leading-[1.6] text-[#14213d]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
        precedence="default"
      />

      <header className="sticky top-0 z-[1000] border-b-[5px] border-[#0031d1] bg-white/95">
        <nav className={`${container} relative flex min-h-[65px] items-center justify-between min-[381px]:min-h-[75px]`}>
          <a href="#inicio" className={logoLink} onClick={irPara("inicio")}>
            <span className={logoBox}><img src={logo} alt="" /></span> JoviClass
          </a>

          <button
            type="button"
            className="block cursor-pointer text-[27px] leading-none text-[#071a35] md:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            ☰
          </button>

          <ul
            className={`absolute inset-x-0 top-full flex flex-col overflow-hidden border-b border-[#0031d1] bg-white shadow-[0_12px_20px_rgba(7,26,53,0.08)] transition-[max-height] duration-300 md:static md:max-h-none md:flex-row md:items-center md:gap-[30px] md:overflow-visible md:border-0 md:bg-transparent md:shadow-none ${menuAberto ? "max-h-[400px]" : "max-h-0"
              }`}
          >
            {MENU.map((item) => (
              <li key={item.id} className="w-full border-t border-[#0031d1] md:w-auto md:border-0">
                <a
                  href={`#${item.id}`}
                  onClick={irPara(item.id)}
                  className="block px-6 py-4 text-sm font-semibold text-[#52637a] transition duration-300 hover:text-[#155eef] md:p-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="w-full border-t border-[#0031d1] p-3 md:w-auto md:border-0 md:p-0">
              <Link
                to={rotaApp}
                onClick={() => setMenuAberto(false)}
                className={`${btnPrimario} min-h-10 w-full md:w-auto`}
              >
                Abrir App
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section
          id="inicio"
          className="grid min-h-[650px] scroll-mt-20 items-center [background:radial-gradient(circle_at_80%_20%,#dbe9ff_0%,transparent_35%),linear-gradient(135deg,#f7faff,#ffffff)]"
        >
          <div className={`${container} grid items-center gap-10 py-10 text-center min-[900px]:grid-cols-[1.1fr_1fr] min-[900px]:text-left lg:gap-[60px]`}>
            <div>
              <h1 className="mx-auto max-w-[650px] text-[clamp(36px,6vw,72px)] font-bold leading-[1.05] tracking-[-1px] text-[#071a35] min-[561px]:tracking-[-2px] min-[900px]:mx-0">
                Seus estudos. <span className="text-[#155eef]">Do seu jeito.</span>
              </h1>
              <p className="mx-auto mb-8 mt-[25px] max-w-[570px] text-[17px] text-[#64748b] min-[900px]:mx-0">
                O JoviClass transforma suas fotos de estudos em uma experiência organizada, prática e inteligente.
              </p>
              <div className="flex flex-wrap justify-center gap-[14px] min-[900px]:justify-start">
                <a href="#solucao" className={btnPrimario} onClick={irPara("solucao")}>Conheça a solução</a>
                <a href="#galeria" className={btnSecundario} onClick={irPara("galeria")}>Ver projeto</a>
              </div>
            </div>

            <div className="h-[26rem] w-52 max-w-full justify-self-center overflow-hidden rounded-[36px] bg-white min-[561px]:h-[32rem] min-[561px]:w-64 min-[900px]:h-[40rem] min-[900px]:w-80 min-[561px]:rounded-[40px]">
              <img
                src={telaInicial}
                alt="Tela do JoviClass"
                className="size-full rounded-[26px] border-[10px] border-black object-cover min-[561px]:rounded-[40px] min-[561px]:border-8"
              />
            </div>
          </div>
        </section>

        <section id="solucao" className={`${secao} bg-white`}>
          <div className={container}>
            <div className={tituloBloco}>
              <h2 className={tituloH2}>Estudar pode ser mais simples.</h2>
              <p className={tituloP}>Nossa solução</p>
            </div>

            <div className="flex flex-col-reverse items-center justify-center gap-[60px] text-center min-[900px]:flex-row min-[900px]:text-left">
              <p className="flex-1 text-[19px] leading-[1.7] text-[#071a35] min-[900px]:basis-[420px] [&_span]:font-semibold [&_span]:text-[#0c4fd7]">
                O <span>JoviClass</span> nasceu a partir de um desafio simples: <span>estudantes</span> registram conteúdos importantes com a <span>câmera</span> do celular, mas acabam com uma galeria cheia de fotos difíceis de organizar, revisar e encontrar depois. <br />
                Nossa solução transforma a câmera do <span>smartphone</span> em uma ferramenta de apoio aos estudos. Com o <span>JoviClass</span>, o estudante pode organizar suas fotos por matérias, reunir conteúdos e criar arquivos, tornando o <span>aprendizado</span> mais prático e acessível.
              </p>
              <img
                src={telaMaterias}
                alt="Tela de matérias do JoviClass"
                className={`${printMobile} h-80 w-full max-w-40 shrink-0 min-[561px]:h-[400px] min-[561px]:max-w-[200px]`}
              />
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="scroll-mt-20 bg-[#f3f7ff]">
          <div className={`${container} grid items-center gap-10 pb-[50px] pt-[60px] text-center min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:pt-[90px] min-[900px]:text-left lg:gap-20`}>
            <div className="flex justify-center">
              <img
                src={telaCalendario}
                alt="Tela de calendário do JoviClass"
                className={`${printMobile} mx-auto my-5 h-[460px] max-h-[80vh] w-full max-w-[220px] min-[561px]:h-[850px] min-[561px]:max-w-[300px]`}
              />
            </div>

            <div>
              <h2 className="mb-10 text-[34px] font-bold leading-[1.1] text-[#071a35] min-[561px]:text-5xl [&_span]:text-[#0c4fd7]">
                Feito para quem <span>aprende todos os dias.</span>
              </h2>
              <h3 className="mb-[30px] font-semibold text-[#0c4fd7]">Funcionalidades do JoviClass</h3>

              <div className="text-left">
                {FUNCIONALIDADES.map((f) => (
                  <div key={f.titulo}>
                    <h4 className="my-2.5 font-extrabold text-[#0c4fd7]">• {f.titulo}</h4>
                    <p className="mt-1 text-base text-[#071a35]">{f.texto}</p>
                  </div>
                ))}
              </div>

              <div className="mt-[25px] text-lg text-[#071a35]">
                <p>
                  A rotina de estudos envolve uma grande quantidade de informações. Fotos de lousas, livros, exercícios e anotações acabam misturadas à galeria pessoal do celular, dificultando a organização e a revisão dos conteúdos.
                </p>
                <h3 className="mb-[30px] mt-[15px] text-xl font-extrabold text-[#155eef]">
                  O JoviClass conecta câmera, organização e estudo em um único espaço.
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="publico" className={`${secao} bg-white`}>
          <div className={container}>
            <div className={tituloBloco}>
              <h2 className={tituloH2}>
                Entenda sobre nosso <span>público-alvo.</span>
              </h2>
              <p className={tituloP}>Estudantes Universitários Full-Time</p>
            </div>

            <div className={`${cardAzul} p-[25px] [&_p]:py-2.5 [&_p]:text-justify [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-[#071a35]`}>
              <h2 className="mb-[15px] text-[32px] font-bold text-[#0466fa]">
                Feito para quem aprende, registra e precisa se organizar.
              </h2>
              <p>O JoviClass é voltado principalmente para estudantes do ensino médio, técnico e superior que utilizam o smartphone como ferramenta de apoio durante sua rotina acadêmica.</p>
              <p>São estudantes que fotografam conteúdos apresentados em sala de aula, páginas de livros, exercícios, anotações, apresentações e outros materiais importantes, mas que muitas vezes acabam acumulando uma grande quantidade de imagens na galeria do celular.</p>
              <h4 className="my-[15px] font-bold text-[#0466fa]">Nosso público é formado por estudantes que:</h4>
              <ul className="ml-[30px] list-disc leading-[1.8]">
                {PERFIS_PUBLICO.map((perfil) => (
                  <li key={perfil}>{perfil}</li>
                ))}
              </ul>
              <p>O celular já faz parte da rotina dos estudantes. O JoviClass aproveita essa realidade e transforma a câmera do smartphone em uma aliada dos estudos, reunindo registro, organização e revisão em um único espaço.</p>
            </div>
          </div>
        </section>

        {/* ===== Galeria ===== */}
        <section id="galeria" className={`${secao} bg-white`}>
          <div className={container}>
            <div className={tituloBloco}>
              <h2 className={tituloH2}>
                Conheça o <span>JoviClass.</span>
              </h2>
              <p className={tituloP}>
                Uma experiência criada para tornar a rotina de estudos mais organizada e prática. Conheça nossa galeria:
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-center gap-[18px]">
              {GALERIA.map((item) => (
                <div
                  key={item.legenda}
                  className={`${cardAzul} mx-auto flex h-[480px] max-h-screen w-full flex-col overflow-hidden p-[15px] min-[561px]:h-[650px] min-[561px]:max-w-[300px]`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className={`${printMobile} h-full min-h-0 w-full flex-auto`}
                  />
                  <p className="shrink-0 p-3 text-center text-sm text-[#071a35]">{item.legenda}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projeto" className={`${secao} bg-white`}>
          <div className={container}>
            <div className={tituloBloco}>
              <h2 className={tituloH2}>
                Tenha a experiência do <span>JoviClass</span> na prática!
              </h2>
              <p className={tituloP}>
                Fique à vontade para conhecer nossa interface.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-center gap-[18px]">
              {PROJETO.map((item) => (
                <div
                  key={item.href}
                  className={`${cardAzul} mx-auto flex min-h-[300px] w-full max-w-[600px] flex-col items-center overflow-hidden p-[15px]`}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-[60px] cursor-pointer items-center justify-center rounded-[25px] bg-[#155eef] px-5 py-[15px] text-center text-[15px] font-bold text-white transition duration-300 hover:bg-[#0c4fd7] min-[561px]:text-lg"
                  >
                    {item.texto}
                  </a>
                  <img src={item.img} alt={item.alt} className="mx-auto mb-2.5 mt-[30px] size-[120px] rounded-[30px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="equipe" className={`${secao} bg-[#f3f7ff]`}>
          <div className={container}>
            <div className={tituloBloco}>
              <h2 className={tituloH2}>
                Quem está por <span>trás do projeto?</span>
              </h2>
              <p className={tituloP}>Uma equipe apaixonada por tecnologia, criatividade e inovação.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[381px]:grid-cols-2 min-[561px]:gap-[18px] md:grid-cols-3 min-[1025px]:grid-cols-5">
              {EQUIPE.map((pessoa) => (
                <div
                  key={pessoa.nome}
                  className="rounded-[18px] border border-[#0031d1] bg-white px-3 py-5 text-center min-[561px]:px-5 min-[561px]:py-[30px]"
                >
                  <img
                    src={pessoa.foto}
                    alt={`Foto de ${pessoa.nome}`}
                    className="mx-auto mb-[18px] size-20 rounded-full object-cover"
                  />
                  <h3 className="text-base font-bold">{pessoa.nome}</h3>
                  <span className="mb-[15px] mt-[5px] block text-xs font-bold text-[#155eef]">{pessoa.cargo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className={`${secao} bg-[#071a35] text-white`}>
          <div className={`${container} grid items-center gap-10 text-center min-[900px]:grid-cols-2 min-[900px]:gap-20 min-[900px]:text-left`}>
            <div>
              <h2 className="text-[30px] font-bold text-white">
                Vamos transformar <span>a forma de estudar?</span>
              </h2>
              <p className="text-[#b7d1f8]">Entre em contato com nossa equipe para conhecer mais sobre o JoviClass.</p>

              <div className="inline-block min-[900px]:block [&_p]:my-3 [&_p]:text-sm [&_p]:text-[#dce5f3]">
                <p>joviclass@email.com</p>
                <p>São Paulo - SP</p>
              </div>
            </div>

            <form
              onSubmit={enviarContato}
              className="rounded-[18px] bg-white p-5 text-left text-[#14213d] min-[561px]:p-[30px] [&_label]:mb-1.5 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_input]:mb-[18px] [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-[#0031d1] [&_input]:px-[14px] [&_input]:py-[13px] [&_input]:outline-none [&_input:focus]:border-[#155eef] [&_textarea]:mb-[18px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[#0031d1] [&_textarea]:px-[14px] [&_textarea]:py-[13px] [&_textarea]:outline-none [&_textarea:focus]:border-[#155eef]"
            >
              <label htmlFor="jc-nome">Nome</label>
              <input type="text" id="jc-nome" name="nome" placeholder="Digite seu nome" required />

              <label htmlFor="jc-email">E-mail</label>
              <input type="email" id="jc-email" name="email" placeholder="Digite seu e-mail" required />

              <label htmlFor="jc-mensagem">Mensagem</label>
              <textarea id="jc-mensagem" name="mensagem" rows={5} placeholder="Digite sua mensagem" required />

              <button type="submit" className={`${btnPrimario} w-full`}>
                Enviar mensagem
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#041226] pt-[50px] text-white">
        <div className={`${container} flex flex-col flex-wrap items-center gap-[30px] pb-[30px] text-center md:flex-row md:items-start md:justify-between md:text-left`}>
          <div>
            <a href="#inicio" className={`${logoLink} text-white`} onClick={irPara("inicio")}>
              <span className={logoBox}><img src={logo} alt="" /></span> JoviClass
            </a>
            <p className="mb-[30px] mt-3 text-[13px] text-[#91a1b9]">Otimize o que tem de mais precioso: seu tempo!</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[22px]">
            {MENU.filter((item) => item.id !== "inicio").map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={irPara(item.id)}
                className="text-xs text-[#b7c4d8] hover:text-white"
              >
                {item.label.replace("A Solução", "Solução").replace("Nossa Equipe", "Equipe")}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
