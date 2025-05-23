"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Perfil = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Usuário");
  const [email, setEmail] = useState("usuario@gmail.com");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setIsEditing(false);
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const getInitial = () => {
    return name.charAt(0).toUpperCase();
  };

  const getBackgroundColor = () => {
    const colors = [
      "#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A8",
      "#33FFF5", "#FF8C33", "#8C33FF", "#33FF8C", "#FF3385"
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] font-sans text-[#333]">
      <header className="flex justify-between items-center px-6 py-4 bg-[#cc0033] text-white shadow-md">
        <h1 className="text-3xl font-bold">CCR ViaSegura</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/perfil" className="underline">Perfil</Link>
          <Link href="/integrantes" className="hover:underline">Sobre</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
          <div className="flex items-center mb-8">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              {getInitial()}
            </div>
            <div className="ml-6 flex flex-col">
              <h2 className="text-3xl font-semibold">{name}</h2>
              <p className="text-[#cc0033] mt-1">{email}</p>
              <button
                className="mt-3 py-1.5 px-5 bg-[#cc0033] rounded-md text-white font-medium transition-colors hover:bg-[#b3002a] focus:outline-none focus:ring-2 focus:ring-[#b3002a]"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancelar" : "Editar Perfil"}
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
                Editar Perfil
              </h3>
              <div>
                <label htmlFor="edit-name" className="block mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-email" className="block mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="edit-password"
                  className="block mb-1 font-medium"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="edit-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nova senha"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#cc0033] rounded text-white font-bold hover:bg-[#b3002a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b3002a]"
              >
                Salvar Alterações
              </button>
            </form>
          ) : (
            <div>
              <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
                Informações do Perfil
              </h3>
              <p className="mb-2">
                <strong>Nome:</strong> {name}
              </p>
              <p>
                <strong>E-mail:</strong> {email}
              </p>
              <button
                className="mt-6 w-full py-2 bg-[#cc0033] rounded text-white font-bold hover:bg-[#b3002a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b3002a]"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 bg-[#cc0033] text-white text-sm">
        <p>
          <a
            href="https://www.grupoccr.com.br/contatos/"
            className="hover:underline"
          >
            Contato
          </a>{" "}
          |{" "}
          <a href="https://mobilidade.grupoccr.com.br" className="hover:underline">
            Grupo CCR
          </a>{" "}
          |{" "}
          <a
            href="https://mobilidade.grupoccr.com.br/viamobilidade5/duvidas-frequentes/"
            className="hover:underline"
          >
            Dúvidas Frequentes
          </a>
        </p>
        <p className="mt-2">© 2024 CCR ViaMobilidade</p>
      </footer>
    </div>
  );
};

export default Perfil;