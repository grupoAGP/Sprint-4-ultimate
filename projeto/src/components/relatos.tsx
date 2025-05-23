'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Relato {
  id: number;
  descricao: string;
  tipoUrgencia: string;
  dataHora: string;
  idEstacao: number;
  idUsuario: number;
}

interface Usuario {
  id: number;
  nome: string;
}

const estacoes = [
  { id: 1, nome: "Júlio Prestes" },
  // ... (todas as outras estações)
];

export default function Relatos() {
  const router = useRouter();
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<'estacao' | 'urgencia' | 'data' | ''>('');
  const [filtroValor, setFiltroValor] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const fetchData = async () => {
      try {
        const [relatosRes, usuariosRes] = await Promise.all([
          axios.get('https://java-railway-production-9435.up.railway.app/relatos'),
          axios.get('https://java-railway-production-9435.up.railway.app/usuarios'),
        ]);
        setRelatos(relatosRes.data);
        setUsuarios(usuariosRes.data);
        setLoading(false);
      } catch (error) {
        setErro('Erro ao carregar relatos ou usuários.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getNomeEstacao = (idEstacao: number) => {
    const estacao = estacoes.find(e => e.id === idEstacao);
    return estacao ? estacao.nome : 'Estação desconhecida';
  };

  const formatarData = (dataHora: string) => {
    const data = new Date(dataHora);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUrgenciaCor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'baixo': return 'text-green-600';
      case 'médio': return 'text-yellow-600';
      case 'alto': return 'text-orange-600';
      case 'crítico': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getUsuarioNome = (idUsuario: number) => {
    const usuario = usuarios.find(u => u.id === idUsuario);
    return usuario ? usuario.nome : 'Usuário desconhecido';
  };

  const relatosFiltrados = relatos.filter(relato => {
    if (filtroTipo === 'estacao') {
      return getNomeEstacao(relato.idEstacao).toLowerCase().includes(filtroValor.toLowerCase());
    }
    if (filtroTipo === 'urgencia') {
      return relato.tipoUrgencia.toLowerCase().includes(filtroValor.toLowerCase());
    }
    if (filtroTipo === 'data') {
      return formatarData(relato.dataHora).includes(filtroValor);
    }
    return true;
  });

  if (loading) return <p>Carregando relatos...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="space-y-6">
      {!isLoggedIn && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-blue-700">
            Faça <a href="/login" className="font-bold underline">login</a> para ver quem reportou cada problema.
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select
          value={filtroTipo}
          onChange={(e) => {
            setFiltroTipo(e.target.value as any);
            setFiltroValor('');
          }}
          className="p-2 rounded border"
        >
          <option value="">Filtrar por...</option>
          <option value="estacao">Estação</option>
          <option value="urgencia">Urgência</option>
          <option value="data">Data</option>
        </select>

        {filtroTipo && (
          <input
            type="text"
            placeholder={`Digite o valor para ${filtroTipo}`}
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
            className="p-2 rounded border w-full md:w-1/3"
          />
        )}
      </div>

      {relatosFiltrados.length > 0 ? (
        relatosFiltrados.map(relato => (
          <div key={relato.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <p className="text-[#333] text-lg font-semibold mb-2">{relato.descricao}</p>
            <p className={`text-sm mb-2 font-medium ${getUrgenciaCor(relato.tipoUrgencia)}`}>
              Nível de Urgência: <span className="font-normal">{relato.tipoUrgencia}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Estação: <span className="font-normal">{getNomeEstacao(relato.idEstacao)}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Data: <span className="font-normal">{formatarData(relato.dataHora)}</span>
            </p>
            <p className="text-sm text-gray-600">
              Reportado por: <span className="font-normal">
                {isLoggedIn ? getUsuarioNome(relato.idUsuario) : "Usuário (faça login para ver)"}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Nenhum relato encontrado com esse filtro.</p>
      )}
    </div>
  );
}