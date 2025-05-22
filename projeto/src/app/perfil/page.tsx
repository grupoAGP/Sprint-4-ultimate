"use client";
import React, { useState } from 'react';

const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Usuário');
    const [email, setEmail] = useState('usuario@gmail.com');
    const [password, setPassword] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        setPassword(''); // Limpa o campo de senha após salvar
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
            <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-[#1c1c1c]">
                <div className="flex items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#f1c40f]">
                        <img src="https://via.placeholder.com/150" alt="Foto do usuário" />
                    </div>
                    <div className="ml-6">
                        <h2 className="text-3xl">{name}</h2>
                        <p className="text-gray-400">{email}</p>
                        <button 
                            className="mt-2 py-1 px-4 bg-[#f1c40f] text-black rounded hover:bg-[#FFD700]"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? "Cancelar" : "Editar Perfil"}
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <div>
                        <h3 className="text-xl mb-4">Editar Perfil</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="edit-name" className="block mb-1">Nome</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-email" className="block mb-1">E-mail</label>
                                <input
                                    type="email"
                                    id="edit-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-password" className="block mb-1">Senha</label>
                                <input
                                    type="password"
                                    id="edit-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 rounded bg-[#292929] text-white border border-[#444]"
                                    placeholder="Nova senha"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-[#f1c40f] text-black font-bold rounded hover:bg-[#FFD700]"
                            >
                                Salvar Alterações
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="mt-6">
                        <h3 className="text-xl mb-4">Informações do Perfil</h3>
                        <p><strong>Nome:</strong> {name}</p>
                        <p><strong>E-mail:</strong> {email}</p>
                        <button 
                            className="mt-4 w-full py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                            onClick={() => window.location.href = '/login'}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;
