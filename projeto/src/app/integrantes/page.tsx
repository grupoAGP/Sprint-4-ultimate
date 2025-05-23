"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Integrantes = () => {
    const integrantes = [
        {
            nome: 'Gustavo Dantas',
            rm: '560685',
            turma: '1º TDSZ',
            github: 'https://github.com/gDantazz',
            linkedin: 'https://www.linkedin.com/in/gustavo-dantas-871a13273/',
            foto: '/fotos/Gustavo.jpg'
        },
        {
            nome: 'Paulo Neto',
            rm: '560262',
            turma: '1º TDSZ',
            github: 'https://github.com/Pnetoo',
            linkedin: 'https://www.linkedin.com/in/paulo-oliveira-neto-5a2970319/',
            foto: '/fotos/Paulo.JPG'
        },
    ];

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
                <h2 className="text-3xl font-semibold mb-8 text-center text-[#cc0033]">Integrantes do Projeto</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {integrantes.map((integrante) => (
                        <div key={integrante.nome} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <Image 
                                src={integrante.foto} 
                                alt={`Foto de ${integrante.nome}`} 
                                width={150} 
                                height={150} 
                                className="mx-auto rounded-full"
                            />
                            <h3 className="text-xl font-semibold text-center mt-4">{integrante.nome}</h3>
                            <p className="text-center mt-2">RM: {integrante.rm}</p>
                            <p className="text-center">Turma: {integrante.turma}</p>
                            <div className="flex justify-center space-x-6 mt-4">
                                <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="text-[#cc0033] hover:underline font-semibold">GitHub</a>
                                <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#cc0033] hover:underline font-semibold">LinkedIn</a>
                            </div>
                        </div>
                    ))}
                </div>
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

export default Integrantes;