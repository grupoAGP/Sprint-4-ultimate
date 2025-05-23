"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Relatos from "../components/relatos";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Home = () => {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");
  const [tipoUrgencia, setTipoUrgencia] = useState("Baixo");
  const [idEstacao, setIdEstacao] = useState<number | "">("");
  const [enviando, setEnviando] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const estacoes = [
    { id: 1, nome: "Júlio Prestes" },
    { id: 2, nome: "Palmeiras-Barra Funda" },
    { id: 3, nome: "Lapa" },
    { id: 4, nome: "Domingos de Moraes" },
    { id: 5, nome: "Imperatriz Leopoldina" },
    { id: 6, nome: "Presidente Altino" },
    { id: 7, nome: "Osasco" },
    { id: 8, nome: "Comandante Sampaio" },
    { id: 9, nome: "Quitaúna" },
    { id: 10, nome: "General Miguel Costa" },
    { id: 11, nome: "Carapicuíba" },
    { id: 12, nome: "Santa Terezinha" },
    { id: 13, nome: "Antônio João" },
    { id: 14, nome: "Barueri" },
    { id: 15, nome: "Jardim Belval" },
    { id: 16, nome: "Jardim Silveira" },
    { id: 17, nome: "Jandira" },
    { id: 18, nome: "Sagrado Coração" },
    { id: 19, nome: "Engenheiro Cardoso" },
    { id: 20, nome: "Itapevi" },
    { id: 21, nome: "Santa Rita" },
    { id: 22, nome: "Amador Bueno" },
    { id: 23, nome: "Ceasa" },
    { id: 24, nome: "Villa Lobos-Jaguaré" },
    { id: 25, nome: "Cidade Universitária" },
    { id: 26, nome: "Pinheiros" },
    { id: 27, nome: "Hebraica-Rebouças" },
    { id: 28, nome: "Cidade Jardim" },
    { id: 29, nome: "Vila Olímpia" },
    { id: 30, nome: "Berrini" },
    { id: 31, nome: "Morumbi-Claro" },
    { id: 32, nome: "Granja Julieta" },
    { id: 33, nome: "João Dias" },
    { id: 34, nome: "Santo Amaro" },
    { id: 35, nome: "Socorro" },
    { id: 36, nome: "Jurubatuba-Senac" },
    { id: 37, nome: "Autódromo" },
    { id: 38, nome: "Primavera-Interlagos" },
    { id: 39, nome: "Grajaú" },
    { id: 40, nome: "Bruno Covas-Mendes-Vila Natal" }
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const getLocalISODateTime = () => {
    const data = new Date();
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}T${pad(data.getHours())}:${pad(data.getMinutes())}:${pad(data.getSeconds())}`;
  };

  const handleReportClick = (type: string) => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para reportar problemas.");
      router.push("/login");
      return;
    }
    setSelectedReport(type);
    setDescricao("");
    setTipoUrgencia("Baixo");
  };

  const handleEnviar = async () => {
    if (!isLoggedIn) {
      alert("Você precisa fazer login para enviar um relato.");
      router.push("/login");
      return;
    }

    if (!selectedReport) {
      alert("Selecione o tipo de problema.");
      return;
    }
    if (!descricao.trim()) {
      alert("Preencha a descrição do problema.");
      return;
    }
    if (idEstacao === "") {
      alert("Selecione a estação.");
      return;
    }

    setEnviando(true);

    try {
      const userId = parseInt(localStorage.getItem("userId") || "0");
      
      const response = await fetch(
        "https://java-railway-production-9435.up.railway.app/relatos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descricao,
            tipoUrgencia,
            dataHora: getLocalISODateTime(),
            idUsuario: userId,
            idEstacao,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao enviar relato");
      
      alert("Relato enviado com sucesso!");
      setDescricao("");
      setSelectedReport(null);
      setIdEstacao("");
      setTipoUrgencia("Baixo");
    } catch (error) {
      alert("Erro ao enviar relato. Tente novamente.");
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#333] font-sans">
      <header className="flex justify-between items-center px-6 py-4 bg-[#cc0033] text-white shadow-md">
        <h1 className="text-3xl font-bold">CCR ViaSegura</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/perfil" className="hover:underline">Perfil</Link>
          <Link href="/integrantes" className="hover:underline">Sobre</Link>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!isLoggedIn && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700">
              Você precisa <Link href="/login" className="font-bold underline">fazer login</Link> para enviar relatos.
            </p>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6 text-center text-[#cc0033]">
          Relatar Problema nas Estações
        </h2>

        <div className="mb-6 max-w-xs mx-auto">
          <label htmlFor="estacao" className="block mb-2 font-semibold text-[#cc0033]">
            Selecione a Estação
          </label>
          <select
            id="estacao"
            value={idEstacao}
            onChange={(e) => setIdEstacao(Number(e.target.value))}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
            disabled={!isLoggedIn}
          >
            <option value="">-- Escolha uma estação --</option>
            {estacoes.map((est) => (
              <option key={est.id} value={est.id}>{est.nome}</option>
            ))}
          </select>
        </div>

        <h3 className="text-xl font-medium mt-8 mb-4">
          Selecione o Tipo de Problema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Superlotação", "Acidente", "Atraso", "Outro Problema"].map((problem) => (
            <div
              key={problem}
              className={`report-option border-2 p-6 rounded-xl text-center cursor-pointer transition-all shadow-sm ${
                selectedReport === problem ? "border-red-700" : "border-gray-300"
              } hover:border-red-700 ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleReportClick(problem)}
            >
              <Image
                src={`/img/${problem.toLowerCase().replace(" ", "")}.png`}
                alt={problem}
                width={60}
                height={60}
                className="mx-auto"
              />
              <h3 className="mt-4 text-lg font-semibold">{problem}</h3>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-[#cc0033]">
              Descreva o Problema
            </h3>
            <textarea
              placeholder="Descreva o problema aqui..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-4 rounded border border-gray-300 bg-[#f9f9f9] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
              rows={5}
              disabled={!isLoggedIn}
            ></textarea>

            <label className="block mt-6 mb-2 font-semibold text-[#cc0033]">
              Selecione a Urgência
            </label>
            <select
              value={tipoUrgencia}
              onChange={(e) => setTipoUrgencia(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
              disabled={!isLoggedIn}
            >
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
              <option value="Crítico">Crítico</option>
            </select>

            <button
              onClick={handleEnviar}
              disabled={enviando || !isLoggedIn}
              className={`mt-6 px-6 py-2 bg-[#cc0033] text-white font-bold rounded hover:bg-[#b3002a] transition-colors ${
                !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {enviando ? "Enviando..." : "Enviar"}
            </button>
          </div>
        )}

        <h3 className="text-xl font-medium mt-10 mb-4 text-[#cc0033]">
          Relatos de hoje
        </h3>
        <Relatos />
      </main>

      <footer className="text-center py-6 bg-[#cc0033] text-white text-sm">
        <p>
          <a href="https://www.grupoccr.com.br/contatos/" className="hover:underline">Contato</a> |{" "}
          <a href="https://mobilidade.grupoccr.com.br" className="hover:underline">Grupo CCR</a> |{" "}
          <a href="https://mobilidade.grupoccr.com.br/viamobilidade5/duvidas-frequentes/" className="hover:underline">
            Dúvidas Frequentes
          </a>
        </p>
        <p className="mt-2">© 2024 CCR ViaMobilidade</p>
      </footer>
    </div>
  );
};

export default Home;