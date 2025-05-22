"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Relatos from '../components/relatos';

const Home = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    const handleReportClick = (type: string) => {
        setSelectedReport(type);
    };

    const borderColors: Record<string, string> = {
        "Superlotação": "border-red-500",
        "Acidente": "border-yellow-500",
        "Atraso": "border-blue-500",
        "Outro Problema": "border-purple-500",
    };

    const hoverColors: Record<string, string> = {
        "Superlotação": "hover:border-red-500",
        "Acidente": "hover:border-yellow-500",
        "Atraso": "hover:border-blue-500",
        "Outro Problema": "hover:border-purple-500",
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
            <header className="flex justify-between items-center p-6 bg-[#1c1c1c] shadow-md">
                <h1 className="text-3xl text-[#f1c40f]">ViaMobilidade</h1>
                <input type="search" placeholder="Pesquisar..." className="px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#444] focus:border-[#f1c40f]" />
                <div className="space-x-6">
                    <a href="/login" className="text-white hover:text-[#f1c40f]">Login</a>
                    <a href="/perfil" className="text-white hover:text-[#f1c40f]">Perfil</a>
                    <a href="/integrantes" className="text-white hover:text-[#f1c40f]">Sobre</a>
                </div>
            </header>

            <main className="container mx-auto py-8">
                <h2 className="text-2xl mb-6 text-center">Relatar Problema nas estações</h2>

                <div className="mb-6 text-center">
                    <input type="text" placeholder="Digite a estação específica..." className="px-4 py-2 rounded border border-[#444] bg-[#1c1c1c] text-white focus:border-[#f1c40f]" />
                </div>

                <h3 className="text-xl mt-8 mb-4">Selecione o Tipo de Problema</h3>
                <div className="grid grid-cols-4 gap-6">
                    {Object.keys(borderColors).map((problem) => (
                        <div
                            key={problem}
                            className={`report-option border-2 p-6 rounded-xl text-center cursor-pointer transition-all
                            ${selectedReport === problem ? borderColors[problem] : 'border-[#292929]'}
                            ${hoverColors[problem]}`}
                            onClick={() => handleReportClick(problem)}
                        >
                            <Image src={`/img/${problem.toLowerCase().replace(' ', '')}.png`} alt={problem} width={60} height={60} className="mx-auto" />
                            <h3>{problem}</h3>
                        </div>
                    ))}
                </div>

                {selectedReport && (
                    <div className="mt-8">
                        <h3 className="text-xl mb-4">Descreva o Problema</h3>
                        <textarea
                            placeholder="Descreva o problema aqui..."
                            className="w-full p-4 rounded border border-[#444] bg-[#1c1c1c] text-white focus:border-[#f1c40f]"
                            rows={5}
                        ></textarea>
                        <button className="mt-4 px-6 py-2 bg-[#f1c40f] text-black font-bold rounded hover:bg-[#FFD700]">Enviar</button>
                    </div>
                )}

                <h3 className="text-xl mt-8 mb-4">Relatos de hoje</h3>
    <Relatos/> {/* <<< Aqui é onde os relatos da API aparecerão */}
            </main>

            <footer className="text-center py-6 bg-[#1c1c1c] text-[#f1f1f1]">
                
                <p><a href="https://www.grupoccr.com.br/contatos/"className="text-white hover:text-[#f1c40f]">Contato</a> | <a href="https://mobilidade.grupoccr.com.br"className="text-white hover:text-[#f1c40f]">Grupo CCR</a> | <a href="https://mobilidade.grupoccr.com.br/viamobilidade5/duvidas-frequentes/"className="text-white hover:text-[#f1c40f]">Dúvidas Frequentes</a></p>
                <p>© 2024 ViaMobilidade</p>
            </footer>
        </div>
    );
};

export default Home;
