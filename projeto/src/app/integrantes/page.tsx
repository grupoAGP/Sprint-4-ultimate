import React from 'react';
import Image from 'next/image';

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
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
            <header className="text-center p-6">
                <h1 className="text-3xl text-[#f1c40f]">Integrantes do Projeto</h1>
            </header>

            <div className="integrantes-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {integrantes.map((integrante) => (
                    <div key={integrante.nome} className="integrante-card bg-[#1c1c1c] rounded-xl p-6 transition-transform transform hover:scale-105">
                        <Image src={integrante.foto} alt={`Foto de ${integrante.nome}`} width={150} height={150} className="mx-auto rounded-full" />
                        <h2 className="text-center text-xl mt-4">{integrante.nome}</h2>
                        <p className="text-center">RM: {integrante.rm}</p>
                        <p className="text-center">Turma: {integrante.turma}</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href={integrante.github} target="_blank" className="text-[#f1c40f] hover:underline">GitHub</a>
                            <a href={integrante.linkedin} target="_blank" className="text-[#f1c40f] hover:underline">LinkedIn</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Integrantes;
