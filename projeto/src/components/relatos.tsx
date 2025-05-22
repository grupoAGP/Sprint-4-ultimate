'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

export default function Relatos() {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [relatosRes, usuariosRes] = await Promise.all([
          axios.get('http://localhost:8080/relatos'),
          axios.get('http://localhost:8080/usuarios'),
        ]);

        setRelatos(relatosRes.data);
        setUsuarios(usuariosRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErro('Erro ao carregar relatos ou usuários.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      case 'baixo':
        return 'text-green-400';
      case 'médio':
        return 'text-yellow-400';
      case 'alto':
        return 'text-orange-400';
      case 'crítico':
        return 'text-red-500';
      default:
        return 'text-gray-300';
    }
  };

  const getUsuarioNome = (idUsuario: number) => {
    const usuario = usuarios.find(u => u.id === idUsuario);
    return usuario ? usuario.nome : 'Desconhecido';
  };

  if (loading) return <p>Carregando relatos...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="space-y-4">
      {relatos.map(relato => (
        <div key={relato.id} className="bg-[#1f1f1f] p-5 rounded-lg shadow-md">
          <p className="text-white text-lg font-semibold mb-1">
            {relato.descricao}
          </p>
          <p className={`text-sm mb-1 ${getUrgenciaCor(relato.tipoUrgencia)}`}>
            <span className="font-medium">Nível de Urgência:</span> {relato.tipoUrgencia}
          </p>
          <p className="text-sm text-gray-400 mb-1">
            <span className="font-medium">Estação:</span> #{relato.idEstacao}
          </p>
          <p className="text-sm text-gray-400 mb-1">
            <span className="font-medium">Data:</span> {formatarData(relato.dataHora)}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Reportado por:</span> {getUsuarioNome(relato.idUsuario)}
          </p>
        </div>
      ))}
    </div>
  );
}
