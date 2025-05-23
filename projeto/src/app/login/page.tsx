"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const Login = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"login" | "cadastro">("login");
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSuccess, setCadastroSuccess] = useState("");

  const apiUrl = "https://java-railway-production-9435.up.railway.app/usuarios";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Erro na resposta da API");

      const users: User[] = await res.json();

      const user = users.find(
        (u) => u.email === emailLogin && u.senha === senhaLogin
      );

      if (user) {
        alert(`Bem-vindo, ${user.nome}!`);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.nome);
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("userEmail", user.email);
        router.push("/perfil");
      } else {
        setLoginError("Email ou senha incorretos.");
      }
    } catch (error) {
      setLoginError("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCadastroError("");
    setCadastroSuccess("");

    if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
      setCadastroError("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Erro na resposta da API");

      const users: User[] = await res.json();

      const emailExists = users.some((u) => u.email === emailCadastro);
      if (emailExists) {
        setCadastroError("Email já cadastrado.");
        return;
      }

      const newUser = {
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        dataCriacao: new Date().toISOString(),
      };

      const postRes = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (postRes.ok) {
        setCadastroSuccess("Cadastro realizado com sucesso! Faça login.");
        setNomeCadastro("");
        setEmailCadastro("");
        setSenhaCadastro("");
        setActiveTab("login");
      } else {
        setCadastroError("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      setCadastroError("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] font-sans text-[#333]">
      <header className="flex justify-between items-center px-6 py-4 bg-[#cc0033] text-white shadow-md">
        <h1 className="text-3xl font-bold">CCR ViaSegura</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/login" className="underline">Login</Link>
          <Link href="/perfil" className="hover:underline">Perfil</Link>
          <Link href="/integrantes" className="hover:underline">Sobre</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl text-center mb-6 text-[#cc0033] font-semibold">
            Bem-vindo à ViaMobilidade
          </h2>

          <div className="flex justify-center mb-6 space-x-4">
            <button
              className={`py-2 px-4 rounded font-semibold ${
                activeTab === "login"
                  ? "bg-[#cc0033] text-white"
                  : "bg-gray-200 text-[#333]"
              }`}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={`py-2 px-4 rounded font-semibold ${
                activeTab === "cadastro"
                  ? "bg-[#cc0033] text-white"
                  : "bg-gray-200 text-[#333]"
              }`}
              onClick={() => setActiveTab("cadastro")}
              type="button"
            >
              Cadastro
            </button>
          </div>

          {activeTab === "login" && (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  placeholder="Digite seu e-mail"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 font-medium">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  placeholder="Digite sua senha"
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="text-red-600">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-[#cc0033] text-white font-bold rounded hover:bg-[#b3002a] transition-colors"
              >
                Entrar
              </button>
            </form>
          )}

          {activeTab === "cadastro" && (
            <form className="space-y-4" onSubmit={handleCadastro}>
              <div>
                <label htmlFor="nome" className="block mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  placeholder="Digite seu nome"
                  value={nomeCadastro}
                  onChange={(e) => setNomeCadastro(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email-cadastro" className="block mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email-cadastro"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  placeholder="Digite seu e-mail"
                  value={emailCadastro}
                  onChange={(e) => setEmailCadastro(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password-cadastro" className="block mb-1 font-medium">
                  Senha
                </label>
                <input
                  type="password"
                  id="password-cadastro"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc0033]"
                  placeholder="Digite sua senha"
                  value={senhaCadastro}
                  onChange={(e) => setSenhaCadastro(e.target.value)}
                  required
                />
              </div>
              {cadastroError && <p className="text-red-600">{cadastroError}</p>}
              {cadastroSuccess && (
                <p className="text-green-600">{cadastroSuccess}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-[#cc0033] text-white font-bold rounded hover:bg-[#b3002a] transition-colors"
              >
                Cadastrar
              </button>
            </form>
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

export default Login;