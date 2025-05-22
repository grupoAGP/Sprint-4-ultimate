"use client";
import React, { useState } from 'react';

const Login = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-[#1c1c1c]">
                <h2 className="text-3xl text-center mb-6">Bem-vindo à ViaMobilidade</h2>
                
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'login' ? 'bg-[#f1c40f] text-black' : 'bg-[#292929] text-white'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'cadastro' ? 'bg-[#f1c40f] text-black' : 'bg-[#292929] text-white'}`}
                        onClick={() => setActiveTab('cadastro')}
                    >
                        Cadastro
                    </button>
                </div>

                {activeTab === 'login' && (
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1">E-mail</label>
                            <input type="email" id="email" className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]" placeholder="Digite seu e-mail" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1">Senha</label>
                            <input type="password" id="password" className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]" placeholder="Digite sua senha" required />
                        </div>
                        <button type="submit" className="w-full py-2 mt-4 bg-[#f1c40f] text-black font-bold rounded hover:bg-[#FFD700]">Entrar</button>
                    </form>
                )}

                {activeTab === 'cadastro' && (
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="nome" className="block mb-1">Nome</label>
                            <input type="text" id="nome" className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]" placeholder="Digite seu nome" required />
                        </div>
                        <div>
                            <label htmlFor="email-cadastro" className="block mb-1">E-mail</label>
                            <input type="email" id="email-cadastro" className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]" placeholder="Digite seu e-mail" required />
                        </div>
                        <div>
                            <label htmlFor="password-cadastro" className="block mb-1">Senha</label>
                            <input type="password" id="password-cadastro" className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]" placeholder="Digite sua senha" required />
                        </div>
                        <button type="submit" className="w-full py-2 mt-4 bg-[#f1c40f] text-black font-bold rounded hover:bg-[#FFD700]">Cadastrar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
